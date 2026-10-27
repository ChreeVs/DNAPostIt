import { Router } from 'express';
import { S3MediaService } from '../services/s3Service.js';
import multer from 'multer';

export const mediaRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 100 * 1024 * 1024 } });

// Generate pre-signed S3 upload URL for client direct uploads
mediaRouter.post('/presign', async (req, res) => {
  try {
    const { filename, mimeType } = req.body;
    if (!filename || !mimeType) {
      return res.status(400).json({ success: false, error: 'filename and mimeType are required' });
    }

    const result = await S3MediaService.getPresignedUploadUrl(filename, mimeType);
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Direct upload to server which streams to S3
mediaRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const key = `uploads/${Date.now()}-${req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const cdnUrl = await S3MediaService.uploadBuffer(req.file.buffer, key, req.file.mimetype);

    res.json({
      success: true,
      data: {
        key,
        cdnUrl,
        size: req.file.size,
        mimeType: req.file.mimetype
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
