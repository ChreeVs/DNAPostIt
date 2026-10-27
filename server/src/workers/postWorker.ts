import { Worker, Job } from 'bullmq';
import { redisConnection, POST_QUEUE_NAME } from '../queues/postQueue.js';
import { prisma } from '../db/prisma.js';
import { MetaDispatcher } from '../dispatchers/metaDispatcher.js';
import { LinkedInDispatcher } from '../dispatchers/linkedinDispatcher.js';
import { TikTokDispatcher } from '../dispatchers/tiktokDispatcher.js';
import { YouTubeDispatcher } from '../dispatchers/youtubeDispatcher.js';
import { ThreadsDispatcher } from '../dispatchers/threadsDispatcher.js';
import { GoogleBusinessDispatcher } from '../dispatchers/gmbDispatcher.js';

export const postPublishingWorker = new Worker(
  POST_QUEUE_NAME,
  async (job: Job<{ postId: string }>) => {
    const { postId } = job.data;
    console.log(`[Worker] Starting job execution for post ID: ${postId}`);

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        workspace: {
          include: {
            socialAccounts: {
              where: { isActive: true }
            }
          }
        }
      }
    });

    if (!post) {
      throw new Error(`Post with ID ${postId} not found in database.`);
    }

    // Set post status to PROCESSING
    await prisma.post.update({
      where: { id: postId },
      data: { status: 'PROCESSING' }
    });

    let anySuccess = false;
    const accounts = post.workspace.socialAccounts;

    for (const platform of post.platforms) {
      const account = accounts.find(a => a.platform === platform);
      if (!account) {
        console.warn(`[Worker] No active social account found for ${platform} in workspace ${post.workspace.name}`);
        await prisma.publicationLog.create({
          data: {
            postId: post.id,
            platform,
            status: 'FAILED',
            errorMessage: `Nessun account ${platform} collegato o attivo.`
          }
        });
        continue;
      }

      let result = { success: false, externalPostId: undefined as string | undefined, externalUrl: undefined as string | undefined, errorMessage: undefined as string | undefined };

      switch (platform) {
        case 'FACEBOOK':
          result = await MetaDispatcher.publishToFacebookPage(
            account.externalId,
            account.accessToken,
            post.content,
            post.mediaUrls
          );
          break;

        case 'INSTAGRAM':
          result = await MetaDispatcher.publishToInstagram(
            account.externalId,
            account.accessToken,
            post.content,
            post.mediaUrls,
            post.firstComment
          );
          break;

        case 'LINKEDIN':
          result = await LinkedInDispatcher.publishToLinkedIn(
            account.externalId,
            account.accessToken,
            post.content,
            post.mediaUrls,
            post.firstComment
          );
          break;

        case 'TIKTOK':
          if (post.mediaUrls.length > 0) {
            result = await TikTokDispatcher.publishToTikTok(
              account.accessToken,
              post.content.substring(0, 150),
              post.mediaUrls[0]
            );
          } else {
            result = { success: false, errorMessage: 'TikTok richiede obbligatoriamente un video.' };
          }
          break;

        case 'YOUTUBE':
          if (post.mediaUrls.length > 0) {
            result = await YouTubeDispatcher.publishToYouTube(
              account.accessToken,
              post.content.substring(0, 100),
              post.content,
              post.mediaUrls[0]
            );
          } else {
            result = { success: false, errorMessage: 'YouTube richiede un video.' };
          }
          break;

        case 'THREADS':
          result = await ThreadsDispatcher.publishToThreads(
            account.externalId,
            account.accessToken,
            post.content,
            post.mediaUrls
          );
          break;

        case 'GMB':
          result = await GoogleBusinessDispatcher.publishToGoogleBusiness(
            account.externalId.split('/')[0] || 'accounts/current',
            account.externalId.split('/')[1] || 'locations/primary',
            account.accessToken,
            post.content,
            post.mediaUrls
          );
          break;
      }

      if (result.success) anySuccess = true;

      // Log result
      await prisma.publicationLog.create({
        data: {
          postId: post.id,
          platform,
          status: result.success ? 'PUBLISHED' : 'FAILED',
          externalPostId: result.externalPostId,
          externalUrl: result.externalUrl,
          errorMessage: result.errorMessage
        }
      });
    }

    // Update final post status
    await prisma.post.update({
      where: { id: postId },
      data: {
        status: anySuccess ? 'PUBLISHED' : 'FAILED',
        publishedAt: anySuccess ? new Date() : null
      }
    });

    console.log(`[Worker] Completed job execution for post ID: ${postId} (Success: ${anySuccess})`);
  },
  {
    connection: redisConnection,
    concurrency: 5
  }
);
