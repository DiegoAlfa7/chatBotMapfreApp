import {Component, Input} from '@angular/core';
import {Message} from "../../../app/classes/Message";
import {CameraOptions} from "@ionic-native/camera";

//Hay que importar la camara en vez de CaeraMock si queremos que en produción se utilize la cámara nativa
//import { Camera } from "@ionic-native/camera";

//---------------------------------
//
import {Toast} from '@ionic-native/toast'

import {CameraMock } from '../../../services/mocks/camera.mock'
import { MapfreService } from '../../../services/mapfre.service';


@Component({
  selector: 'message-camera-intent',
  templateUrl: 'message_cameraIntent.template.html'
})
export class MessageCameraIntentComponent {

  @Input() public message:Message;
  // 0 for CAMERA, 1 for VIDEO or any for both
  @Input() public intentType:number;

  public imgRetrieved:boolean = false;

  //  destinationType values: --
  //  ------------------------
  // DATA_URL : 0, Return image as base64-encoded string
  // FILE_URI : 1, Return image file URI
  // NATIVE_URI : 2 Return image native URI (e.g., assets-library:// on iOS or content:// on Android)

  private default_camera_options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE

  };





  public base64ImageString:string;

  constructor(
    private camera:CameraMock,
    private mapfre:MapfreService,
    private toast:Toast) {




  }

  sendImg(){
    //this.toast should be mock for testing purpouses
    this.toast.showLongBottom("Image sent...");




  }

  getImage(){



    //Camera.getPicture returns a Promise, so should implement success and error cb functions
    console.log('Getting Photo');
    this.camera.getPicture(this.default_camera_options).then((imageData) => {

      // data is base64:

      this.base64ImageString = imageData+'';
      this.imgRetrieved = true;



    }, (err) => {
      // Handle error
    });




  }

}
