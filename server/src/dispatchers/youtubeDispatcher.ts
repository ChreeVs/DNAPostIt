import axios from 'axios';
import { PublishResult } from './metaDispatcher';

export class YouTubeDispatcher {
  /**
   * Publishes video to YouTube using Data API v3
   */
  static async publishToYouTube(
    accessToken: string,
    title: string,
    description: string,
    videoUrl: string
  ): Promise<PublishResult> {
    try {
      // In production, stream video from CloudFront URL or local transcode output
      const res = await axios.post(
        'https://www.googleapis.com/youtube/v3/videos?part=snippet,status',
        {
          snippet: {
            title: title.substring(0, 100),
            description: description,
            categoryId: '28' // Science & Technology
          },
          status: {
            privacyStatus: 'public',
            selfDeclaredMadeForKids: false
          }
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return {
        success: true,
        externalPostId: res.data.id,
        externalUrl: `https://www.youtube.com/watch?v=${res.data.id}`
      };
    } catch (err: any) {
      const msg = err.response?.data?.error?.message || err.message;
      return { success: false, errorMessage: `YouTube publish failed: ${msg}` };
    }
  }
}
