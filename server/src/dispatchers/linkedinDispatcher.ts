import axios from 'axios';
import { PublishResult } from './metaDispatcher';

export class LinkedInDispatcher {
  private static readonly API_BASE = 'https://api.linkedin.com/v2';

  /**
   * Publishes post to LinkedIn Organization or Personal Profile
   */
  static async publishToLinkedIn(
    authorUrn: string, // e.g. "urn:li:organization:123456" or "urn:li:person:abcdef"
    accessToken: string,
    content: string,
    mediaUrls: string[],
    firstComment?: string | null
  ): Promise<PublishResult> {
    try {
      let shareMediaCategory = 'NONE';
      let mediaPayload: any[] = [];

      if (mediaUrls.length > 0) {
        shareMediaCategory = 'IMAGE';
        // For LinkedIn images with external public CDN URLs
        mediaPayload = mediaUrls.map(url => ({
          status: 'READY',
          originalUrl: url
        }));
      }

      const body: any = {
        author: authorUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: shareMediaCategory,
            ...(mediaPayload.length > 0 ? { media: mediaPayload } : {})
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      };

      const res = await axios.post(`${this.API_BASE}/ugcPosts`, body, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'Content-Type': 'application/json'
        }
      });

      const postId = res.data.id;

      // Post First Comment if provided
      if (firstComment && firstComment.trim()) {
        try {
          const encodedUrn = encodeURIComponent(postId);
          await axios.post(
            `${this.API_BASE}/socialActions/${encodedUrn}/comments`,
            {
              actor: authorUrn,
              message: {
                text: firstComment
              }
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0'
              }
            }
          );
        } catch (commentErr: any) {
          console.warn('LinkedIn first comment failed:', commentErr.message);
        }
      }

      return {
        success: true,
        externalPostId: postId,
        externalUrl: `https://www.linkedin.com/feed/update/${postId}`
      };
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      return { success: false, errorMessage: `LinkedIn publish failed: ${msg}` };
    }
  }
}
