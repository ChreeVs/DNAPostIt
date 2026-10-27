import { Router } from 'express';
import { PCloudMediaService } from '../services/pCloudService.js';
import { S3MediaService } from '../services/s3Service.js';
import multer from 'multer';

export const mediaRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 250 * 1024 * 1024 } }); // 250MB for video/reels

/**
 * Test pCloud OAuth token and fetch storage quota
 */
mediaRouter.post('/pcloud/test', async (req, res) => {
  try {
    const { token } = req.body;
    const info = await PCloudMediaService.testConnection(token);
    res.json({ success: true, data: info });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/**
 * Direct upload to server which saves to pCloud (default) or S3
 */
mediaRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Nessun file caricato' });
    }

    const provider = process.env.MEDIA_STORAGE_PROVIDER || 'pcloud';

    if (provider === 's3') {
      const key = `uploads/${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const cdnUrl = await S3MediaService.uploadBuffer(req.file.buffer, key, req.file.mimetype);

      return res.json({
        success: true,
        data: {
          provider: 's3',
          key,
          url: cdnUrl,
          size: req.file.size,
          mimeType: req.file.mimetype
        }
      });
    }

    // Default: pCloud upload with direct CDN link
    const result = await PCloudMediaService.uploadBuffer(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    res.json({
      success: true,
      data: {
        provider: 'pcloud',
        fileId: result.fileId,
        filename: result.filename,
        url: result.directUrl,
        size: result.size,
        mimeType: result.mimeType
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
