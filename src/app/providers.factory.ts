import { Platform } from 'ionic-angular';

import { Camera } from "@ionic-native/camera";
import { MediaCapture } from "@ionic-native/media-capture";
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import { CameraMock } from '../services/mocks/camera.mock';
import { MediaCaptureMock } from '../services/mocks/media-capture.mock';
import { MediaMock } from '../services/mocks/media.mock';
import { FileMock } from '../services/mocks/file.mock';

export function cameraProvider(platform: Platform) {
  if (platform.is('android') || platform.is('ios')) {
    return new Camera();
  } else {
    return new CameraMock();
  }
}

export function mediaCaptureProvider(platform: Platform) {
  if (platform.is('android') || platform.is('ios')) {
    return new MediaCapture();
  } else {
    return new MediaCaptureMock();
  }
}

export function mediaProvider(platform: Platform) {
  if (platform.is('android') || platform.is('ios')) {
    return new Media();
  } else {
    return new MediaMock();
  }
}

export function fileProvider(platform: Platform) {
  if (platform.is('android') || platform.is('ios')) {
    return new File();
  } else {
    return new FileMock();
  }
}
