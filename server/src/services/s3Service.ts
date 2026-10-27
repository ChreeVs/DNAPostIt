import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-central-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'dnapostit-media-storage';
const CLOUDFRONT_DOMAIN = process.env.AWS_CLOUDFRONT_DOMAIN || 'https://d111111abcdef8.cloudfront.net';

export class S3MediaService {
  /**
   * Uploads a raw buffer directly to AWS S3 bucket
   */
  static async uploadBuffer(buffer: Buffer, key: string, mimeType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      CacheControl: 'max-age=31536000'
    });

    await s3Client.send(command);
    return this.resolveCdnUrl(key);
  }

  /**
   * Generates a pre-signed S3 upload URL for direct browser uploads
   */
  static async getPresignedUploadUrl(filename: string, mimeType: string): Promise<{ uploadUrl: string; key: string; cdnUrl: string }> {
    const timestamp = Date.now();
    const cleanName = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `uploads/${new Date().getFullYear()}/${new Date().getMonth() + 1}/${timestamp}-${cleanName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      ContentType: mimeType
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    const cdnUrl = this.resolveCdnUrl(key);

    return { uploadUrl, key, cdnUrl };
  }

  /**
   * Deletes an object from S3
   */
  static async deleteObject(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    });
    await s3Client.send(command);
  }

  /**
   * Resolves public CloudFront CDN URL for social networks
   */
  static resolveCdnUrl(key: string): string {
    const base = CLOUDFRONT_DOMAIN.replace(/\/$/, '');
    const cleanKey = key.replace(/^\//, '');
    return `${base}/${cleanKey}`;
  }
}
