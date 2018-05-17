import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Message} from "../../../app/classes/Message";
import {CameraOptions} from "@ionic-native/camera";

//Hay que importar la camara en vez de CaeraMock si queremos que en produción se utilize la cámara nativa
import { Camera } from "@ionic-native/camera";

//---------------------------------
//
import {Toast} from '@ionic-native/toast'

//import {CameraMock } from '../../../services/mocks/camera.mock'
import { MapfreService } from '../../../services/mapfre.service';
import {CaptureVideoOptions, MediaCapture, MediaFile} from "@ionic-native/media-capture";


@Component({
  selector: 'message-camera-intent',
  templateUrl: 'message_cameraIntent.template.html'
})
export class MessageCameraIntentComponent {

  @ViewChild('videoOutput') videoOut: ElementRef;

  @Input() public message:Message;
  // 0 for CAMERA, 1 for VIDEO or any for both
  @Input() public intentType:number;

  public imgRetrieved:boolean = false;
  public videoRetrieved:boolean = false;

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

  private default_videoCamera_options: CaptureVideoOptions = {
    limit:1,
    duration: 20
  };
  public base64ImageString:string;

  constructor(
    private camera:Camera,
    private mapfre:MapfreService,
    private toast:Toast,
    private mediaCapture:MediaCapture) {




  }






  sendImage(){

  this.toast.showLongCenter("Img sent...");

  }

  sendVideo(){



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
  getVideo(){



    //MediaCapture.captureVideo() returns a Promise, so should implement success and error cb functions
    console.log('Getting Video');
    this.mediaCapture.captureVideo(this.default_videoCamera_options).then(

      (videoData: MediaFile[]) =>{

        let data = JSON.stringify(videoData);
        let result = JSON.parse(data);

        let videoURL = result[0].fullPath;

        let videoTag = this.videoOut.nativeElement;
        this.videoRetrieved = true;
        console.log(videoURL);
        videoTag.src = videoURL;
        videoTag.play();


      },
      (err) => {

        console.log(err);
        this.toast.showLongCenter(err.code).subscribe(then=>{


          console.log("Toast:"+ err.code);


        });

      });




  }

}
