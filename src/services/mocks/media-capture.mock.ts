import { MediaCapture } from "@ionic-native/media-capture";
import { Injectable } from "@angular/core";

export interface MediaFile {
  /**
   * The name of the file, without path information.
   */
  name: string;
  /**
   * The full path of the file, including the name.
   */
  fullPath: string;
  /**
   * The file's mime type
   */
  type: string;
  /**
   * The date and time when the file was last modified.
   */
  lastModifiedDate: Date;
  /**
   * The size of the file, in bytes.
   */
  size: number;
  /**
   * Retrieves the format information of the media file.
   * @param {Function} successCallback
   * @param {Function} errorCallback
   */
  getFormatData(successCallback: (data: MediaFileData) => any, errorCallback?: (err: any) => any): void;
}
export interface MediaFileData {
  /**
   * The actual format of the audio and video content.
   */
  codecs: string;
  /**
   * The average bitrate of the content. The value is zero for images.
   */
  bitrate: number;
  /**
   * The height of the image or video in pixels. The value is zero for audio clips.
   */
  height: number;
  /**
   * The width of the image or video in pixels. The value is zero for audio clips.
   */
  width: number;
  /**
   * The length of the video or sound clip in seconds. The value is zero for images.
   */
  duration: number;
}
export interface CaptureError {
  code: string;
}
export interface CaptureAudioOptions {
  /**
   * Maximum number of audio clips. Defaults to 1.
   * On iOS you can only record one file.
   */
  limit?: number;
  /**
   * Maximum duration of an audio sound clip, in seconds. This does not work on Android devices.
   */
  duration?: number;
}
@Injectable()
export class MediaCaptureMock extends MediaCapture {

  captureAudio(options?: CaptureAudioOptions): Promise<MediaFile[] | CaptureError> {
      let response: Array<MediaFile> = [];
      return new Promise((resolve, reject) => {
          resolve(response);
      });
  };
}
