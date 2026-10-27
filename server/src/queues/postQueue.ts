import { Queue } from 'bullmq';
import IORedis from 'ioredis';

export const redisConnection = new IORedis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null
});

export const POST_QUEUE_NAME = 'social-post-publishing';

export const postPublishingQueue = new Queue(POST_QUEUE_NAME, {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 60000 // 1 min, 2 min, 4 min
    },
    removeOnComplete: {
      age: 86400 * 7 // Keep completed jobs for 7 days
    },
    removeOnFail: {
      age: 86400 * 30 // Keep failed jobs for 30 days
    }
  }
});

export async function schedulePostJob(postId: string, scheduledDate: Date): Promise<string> {
  const now = Date.now();
  const targetTime = new Date(scheduledDate).getTime();
  const delay = Math.max(0, targetTime - now);

  const job = await postPublishingQueue.add(
    'publish-post',
    { postId },
    {
      delay,
      jobId: `post_${postId}`
    }
  );

  return job.id!;
}

export async function cancelPostJob(postId: string): Promise<boolean> {
  const job = await postPublishingQueue.getJob(`post_${postId}`);
  if (job) {
    await job.remove();
    return true;
  }
  return false;
}
