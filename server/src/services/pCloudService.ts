import axios from 'axios';
import FormData from 'form-data';

export interface PCloudUploadResult {
  fileId: number;
  filename: string;
  directUrl: string;
  size: number;
  mimeType: string;
}

export interface PCloudUserInfo {
  valid: boolean;
  email?: string;
  quotaBytes?: number;
  usedQuotaBytes?: number;
  totalQuotaGB?: string;
  usedQuotaGB?: string;
  freeQuotaGB?: string;
  isPremium?: boolean;
}

export class PCloudMediaService {
  private static getApiHost(): string {
    return process.env.PCLOUD_API_HOST || 'https://eapi.pcloud.com';
  }

  private static getAccessToken(): string {
    return process.env.PCLOUD_ACCESS_TOKEN || '';
  }

  private static getFolderName(): string {
    return process.env.PCLOUD_FOLDER_NAME || 'DNAPostIt_Media';
  }

  /**
   * Tests the validity of the pCloud OAuth token and retrieves account quota details
   */
  static async testConnection(customToken?: string): Promise<PCloudUserInfo> {
    const token = customToken || this.getAccessToken();
    if (!token) {
      throw new Error('pCloud Access Token non configurato.');
    }

    const host = this.getApiHost();
    const response = await axios.get(`${host}/userinfo`, {
      params: { access_token: token }
    });

    if (response.data.result !== 0) {
      throw new Error(response.data.error || 'Autenticazione pCloud fallita.');
    }

    const quota = response.data.quota || 0;
    const used = response.data.usedquota || 0;
    const free = Math.max(0, quota - used);

    return {
      valid: true,
      email: response.data.email,
      quotaBytes: quota,
      usedQuotaBytes: used,
      totalQuotaGB: (quota / (1024 * 1024 * 1024)).toFixed(1),
      usedQuotaGB: (used / (1024 * 1024 * 1024)).toFixed(1),
      freeQuotaGB: (free / (1024 * 1024 * 1024)).toFixed(1),
      isPremium: !!response.data.premium
    };
  }

  /**
   * Finds or creates the target folder in pCloud (root folderid = 0)
   */
  static async getOrCreateFolderId(folderName?: string): Promise<number> {
    const token = this.getAccessToken();
    const host = this.getApiHost();
    const targetName = folderName || this.getFolderName();

    const response = await axios.get(`${host}/createfolderifnotexists`, {
      params: {
        access_token: token,
        folderid: 0,
        name: targetName
      }
    });

    if (response.data.result !== 0 && response.data.result !== 2004) {
      // 2004 = already exists
      throw new Error(`Impossibile creare cartella pCloud: ${response.data.error || response.data.result}`);
    }

    return response.data.metadata?.folderid || 0;
  }

  /**
   * Uploads an image or video buffer to pCloud and returns a direct public CDN URL
   */
  static async uploadBuffer(
    buffer: Buffer,
    filename: string,
    mimeType: string,
    customFolderId?: number
  ): Promise<PCloudUploadResult> {
    const token = this.getAccessToken();
    if (!token) {
      throw new Error('pCloud Access Token mancante nelle variabili d\'ambiente (PCLOUD_ACCESS_TOKEN).');
    }

    const host = this.getApiHost();
    const folderId = customFolderId !== undefined ? customFolderId : await this.getOrCreateFolderId();

    const form = new FormData();
    const cleanFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    form.append('file', buffer, { filename: cleanFilename, contentType: mimeType });

    const uploadRes = await axios.post(`${host}/uploadfile`, form, {
      params: {
        access_token: token,
        folderid: folderId
      },
      headers: form.getHeaders(),
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    if (uploadRes.data.result !== 0 || !uploadRes.data.metadata || uploadRes.data.metadata.length === 0) {
      throw new Error(uploadRes.data.error || 'Errore durante l\'upload del file su pCloud.');
    }

    const fileMeta = uploadRes.data.metadata[0];
    const fileId = fileMeta.fileid;

    // Get direct CDN link accessible to Instagram, Facebook, TikTok, LinkedIn
    const directUrl = await this.getDirectLink(fileId);

    return {
      fileId,
      filename: cleanFilename,
      directUrl,
      size: fileMeta.size || buffer.length,
      mimeType
    };
  }

  /**
   * Generates a direct, public download CDN link via pCloud getfilelink API
   * Format: https://{host}{path}
   */
  static async getDirectLink(fileId: number): Promise<string> {
    const token = this.getAccessToken();
    const host = this.getApiHost();

    const res = await axios.get(`${host}/getfilelink`, {
      params: {
        access_token: token,
        fileid: fileId,
        forcedownload: 0,
        contenttype: 1
      }
    });

    if (res.data.result !== 0 || !res.data.hosts || res.data.hosts.length === 0) {
      throw new Error(res.data.error || 'Impossibile generare il link diretto pCloud.');
    }

    const chosenHost = res.data.hosts[0];
    const path = res.data.path;

    return `https://${chosenHost}${path}`;
  }

  /**
   * Deletes a file from pCloud
   */
  static async deleteFile(fileId: number): Promise<void> {
    const token = this.getAccessToken();
    const host = this.getApiHost();

    await axios.get(`${host}/deletefile`, {
      params: {
        access_token: token,
        fileid: fileId
      }
    });
  }
}
