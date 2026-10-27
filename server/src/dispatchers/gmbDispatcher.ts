import axios from 'axios';
import { PublishResult } from './metaDispatcher';

export class GoogleBusinessDispatcher {
  /**
   * Publishes local update post to Google Business Profile (GMB)
   */
  static async publishToGoogleBusiness(
    accountId: string,
    locationId: string,
    accessToken: string,
    summary: string,
    mediaUrls: string[]
  ): Promise<PublishResult> {
    try {
      const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/localPosts`;

      const mediaPayload = mediaUrls.length > 0 ? [{
        mediaFormat: 'PHOTO',
        sourceUrl: mediaUrls[0]
      }] : [];

      const res = await axios.post(
        url,
        {
          languageCode: 'it-IT',
          summary: summary,
          topicType: 'STANDARD',
          ...(mediaPayload.length > 0 ? { media: mediaPayload } : {}),
          callToAction: {
            actionType: 'LEARN_MORE',
            url: 'https://social.tuodominio.it'
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
        externalPostId: res.data.name,
        externalUrl: res.data.searchUrl || 'https://google.com/business'
      };
    } catch (err: any) {
      const msg = err.response?.data?.error?.message || err.message;
      return { success: false, errorMessage: `Google Business publish failed: ${msg}` };
    }
  }
}
