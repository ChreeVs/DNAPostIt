import axios from 'axios';
import { PublishResult } from './metaDispatcher';

export class TikTokDispatcher {
  private static readonly API_BASE = 'https://open.tiktokapis.com/v2';

  /**
   * Publishes video to TikTok via Content Posting API (PULL_FROM_URL)
   */
  static async publishToTikTok(
    accessToken: string,
    title: string,
    videoUrl: string
  ): Promise<PublishResult> {
    try {
      const res = await axios.post(
        `${this.API_BASE}/post/publish/video/init/`,
        {
          post_info: {
            title: title,
            privacy_level: 'PUBLIC_TO_EVERYONE',
            disable_duet: false,
            disable_stitch: false,
            disable_comment: false
          },
          source_info: {
            source: 'PULL_FROM_URL',
            video_url: videoUrl
          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
          }
        }
      );

      const publishId = res.data?.data?.publish_id;
      return {
        success: true,
        externalPostId: publishId,
        externalUrl: `https://www.tiktok.com`
      };
    } catch (err: any) {
      const msg = err.response?.data?.error?.message || err.message;
      return { success: false, errorMessage: `TikTok publish failed: ${msg}` };
    }
  }
}
