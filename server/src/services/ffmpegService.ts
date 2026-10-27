import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

export class VideoTranscoderService {
  /**
   * Transcodes any input video into standard H.264/AAC MP4 compatible with
   * Instagram Reels, TikTok, YouTube Shorts and Facebook Feed requirements.
   */
  static async transcodeToSocialStandard(inputPath: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          '-pix_fmt yuv420p',           // Standard 8-bit YUV 4:2:0 for maximum mobile compatibility
          '-profile:v main',
          '-level 4.0',
          '-preset fast',
          '-crf 23',                    // High quality visual bitrate balance
          '-movflags +faststart',       // Places moov atom at beginning for streaming playback
          '-r 30',                      // 30 FPS standard
          '-g 60',                      // GOP size 60 (keyframe every 2 seconds required by IG)
          '-b:a 128k',                  // 128 kbps AAC audio
          '-ar 44100'                   // 44.1 kHz sample rate
        ])
        .on('end', () => resolve(outputPath))
        .on('error', (err) => reject(new Error(`FFmpeg transcoding failed: ${err.message}`)))
        .save(outputPath);
    });
  }

  /**
   * Extracts a high-res video thumbnail frame at 1 second
   */
  static async extractThumbnail(videoPath: string, outputDir: string, filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .screenshots({
          timestamps: ['00:00:01.000'],
          filename: filename,
          folder: outputDir,
          size: '1080x?'
        })
        .on('end', () => resolve(path.join(outputDir, filename)))
        .on('error', (err) => reject(new Error(`FFmpeg thumbnail failed: ${err.message}`)));
    });
  }
}
