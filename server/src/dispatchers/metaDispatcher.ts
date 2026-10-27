import axios from 'axios';

export interface PublishResult {
  success: boolean;
  externalPostId?: string;
  externalUrl?: string;
  errorMessage?: string;
}

export class MetaDispatcher {
  private static readonly GRAPH_API_BASE = 'https://graph.facebook.com/v21.0';

  /**
   * Publishes post to Facebook Page
   */
  static async publishToFacebookPage(
    pageId: string,
    accessToken: string,
    content: string,
    mediaUrls: string[]
  ): Promise<PublishResult> {
    try {
      if (mediaUrls.length === 0) {
        // Simple text / link post
        const res = await axios.post(`${this.GRAPH_API_BASE}/${pageId}/feed`, {
          message: content,
          access_token: accessToken
        });
        return {
          success: true,
          externalPostId: res.data.id,
          externalUrl: `https://facebook.com/${res.data.id}`
        };
      } else if (mediaUrls.length === 1) {
        // Single photo post
        const res = await axios.post(`${this.GRAPH_API_BASE}/${pageId}/photos`, {
          caption: content,
          url: mediaUrls[0],
          access_token: accessToken
        });
        return {
          success: true,
          externalPostId: res.data.id,
          externalUrl: `https://facebook.com/${res.data.id}`
        };
      } else {
        // Multi-photo post (Publish unattached photos first, then attach to feed)
        const photoIds: string[] = [];
        for (const url of mediaUrls) {
          const photoRes = await axios.post(`${this.GRAPH_API_BASE}/${pageId}/photos`, {
            url: url,
            published: false,
            access_token: accessToken
          });
          photoIds.push(photoRes.data.id);
        }

        const attachedMedia = photoIds.map(id => ({ media_fbid: id }));
        const feedRes = await axios.post(`${this.GRAPH_API_BASE}/${pageId}/feed`, {
          message: content,
          attached_media: attachedMedia,
          access_token: accessToken
        });

        return {
          success: true,
          externalPostId: feedRes.data.id,
          externalUrl: `https://facebook.com/${feedRes.data.id}`
        };
      }
    } catch (err: any) {
      const msg = err.response?.data?.error?.message || err.message;
      return { success: false, errorMessage: `Facebook publish failed: ${msg}` };
    }
  }

  /**
   * Publishes post or carousel to Instagram Professional Account via Container Workflow
   */
  static async publishToInstagram(
    igUserId: string,
    accessToken: string,
    content: string,
    mediaUrls: string[],
    firstComment?: string | null
  ): Promise<PublishResult> {
    try {
      let creationId: string;

      if (mediaUrls.length === 1) {
        // Single Image or Reel container
        const isVideo = mediaUrls[0].endsWith('.mp4');
        const containerRes = await axios.post(`${this.GRAPH_API_BASE}/${igUserId}/media`, {
          caption: content,
          ...(isVideo ? { media_type: 'REELS', video_url: mediaUrls[0] } : { image_url: mediaUrls[0] }),
          access_token: accessToken
        });
        creationId = containerRes.data.id;
      } else if (mediaUrls.length > 1) {
        // Carousel Container Workflow
        const itemContainerIds: string[] = [];
        for (const url of mediaUrls) {
          const isVideo = url.endsWith('.mp4');
          const itemRes = await axios.post(`${this.GRAPH_API_BASE}/${igUserId}/media`, {
            is_carousel_item: true,
            ...(isVideo ? { media_type: 'VIDEO', video_url: url } : { image_url: url }),
            access_token: accessToken
          });
          itemContainerIds.push(itemRes.data.id);
        }

        const carouselRes = await axios.post(`${this.GRAPH_API_BASE}/${igUserId}/media`, {
          media_type: 'CAROUSEL',
          caption: content,
          children: itemContainerIds,
          access_token: accessToken
        });
        creationId = carouselRes.data.id;
      } else {
        return { success: false, errorMessage: 'Instagram requires at least one image or video.' };
      }

      // Wait a moment for container processing
      await new Promise(r => setTimeout(r, 4000));

      // Publish the container
      const publishRes = await axios.post(`${this.GRAPH_API_BASE}/${igUserId}/media_publish`, {
        creation_id: creationId,
        access_token: accessToken
      });

      const publishedMediaId = publishRes.data.id;

      // Post First Comment if requested
      if (firstComment && firstComment.trim()) {
        try {
          await axios.post(`${this.GRAPH_API_BASE}/${publishedMediaId}/comments`, {
            message: firstComment,
            access_token: accessToken
          });
        } catch (commentErr: any) {
          console.warn('Instagram first comment failed:', commentErr.message);
        }
      }

      return {
        success: true,
        externalPostId: publishedMediaId,
        externalUrl: `https://instagram.com/p/${publishedMediaId}`
      };
    } catch (err: any) {
      const msg = err.response?.data?.error?.message || err.message;
      return { success: false, errorMessage: `Instagram publish failed: ${msg}` };
    }
  }
}
