import { Router } from 'express';
import { prisma } from '../db/prisma.js';

export const channelsRouter = Router();

// GET all social accounts and token health status
channelsRouter.get('/', async (req, res) => {
  try {
    const accounts = await prisma.socialAccount.findMany({
      where: { isActive: true },
      select: {
        id: true,
        platform: true,
        accountName: true,
        accountHandle: true,
        tokenExpiresAt: true,
        metadata: true,
        createdAt: true
      }
    });

    res.json({ success: true, data: accounts });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
