import { Router } from 'express';
import { prisma } from '../db/prisma.js';
import { schedulePostJob, cancelPostJob } from '../queues/postQueue.js';

export const postsRouter = Router();

// GET all posts
postsRouter.get('/', async (req, res) => {
  try {
    const { start, end } = req.query;

    const where: any = {};
    if (start && end) {
      where.scheduledAt = {
        gte: new Date(String(start)),
        lte: new Date(String(end))
      };
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        logs: true
      },
      orderBy: { scheduledAt: 'asc' }
    });

    res.json({ success: true, data: posts });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// CREATE / SCHEDULE new post
postsRouter.post('/', async (req, res) => {
  try {
    const { content, platforms, mediaUrls, scheduledAt, firstComment, workspaceId } = req.body;

    // Use default workspace if none specified
    let targetWorkspaceId = workspaceId;
    if (!targetWorkspaceId) {
      const defaultWorkspace = await prisma.workspace.findFirst();
      targetWorkspaceId = defaultWorkspace?.id;
    }

    if (!targetWorkspaceId) {
      // Create initial workspace if database is empty
      const createdWs = await prisma.workspace.create({
        data: { name: 'PAA', slug: 'paa' }
      });
      targetWorkspaceId = createdWs.id;
    }

    const post = await prisma.post.create({
      data: {
        workspaceId: targetWorkspaceId,
        content,
        platforms: platforms || ['INSTAGRAM', 'LINKEDIN'],
        mediaUrls: mediaUrls || [],
        scheduledAt: new Date(scheduledAt || Date.now()),
        firstComment: firstComment || null,
        status: 'SCHEDULED'
      }
    });

    // Schedule job in BullMQ queue
    const jobId = await schedulePostJob(post.id, post.scheduledAt);

    res.json({ success: true, data: post, jobId });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE / CANCEL post
postsRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await cancelPostJob(id);
    await prisma.post.delete({ where: { id } });
    res.json({ success: true, message: 'Post eliminato e job rimosso dalla coda.' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});
