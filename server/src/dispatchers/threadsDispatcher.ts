import axios from 'axios';
import { PublishResult } from './metaDispatcher';

export class ThreadsDispatcher {
  private static readonly API_BASE = 'https://graph.threads.net/v1.0';

  /**
   * Publishes post to Threads via Official Graph API
   */
  static async publishToThreads(
    threadsUserId: string,
    accessToken: string,
    text: string,
    mediaUrls: string[]
  ): Promise<PublishResult> {
    try {
      let mediaType = 'TEXT';
      let payload: any = {
        text: text,
        access_token: accessToken
      };

      if (mediaUrls.length > 0) {
        const isVideo = mediaUrls[0].endsWith('.mp4');
        if (isVideo) {
          payload.media_type = 'VIDEO';
          payload.video_url = mediaUrls[0];
        } else {
          payload.media_type = 'IMAGE';
          payload.image_url = mediaUrls[0];
        }
      }

      // 1. Create Threads Container
      const createRes = await axios.post(`${this.API_BASE}/${threadsUserId}/threads`, payload);
      const creationId = createRes.data.id;

      // 2. Wait for container preparation
      await new Promise(r => setTimeout(r, 3000));

      // 3. Publish Container
      const publishRes = await axios.post(`${this.API_BASE}/${threadsUserId}/threads_publish`, {
        creation_id: creationId,
        access_token: accessToken
      });

      return {
        success: true,
        externalPostId: publishRes.data.id,
        externalUrl: `https://www.threads.net`
      };
    } catch (err: any) {
      const msg = err.response?.data?.error?.message || err.message;
      return { success: false, errorMessage: `Threads publish failed: ${msg}` };
    }
  }
}
