import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from "../../../app/classes/Message";
//Hay que importar la camara en vez de CaeraMock si queremos que se utilize la cámara nativa
import {Camera, CameraOptions} from "@ionic-native/camera";
//---------------------------------
import {ToastController} from "ionic-angular";
import {MapfreService} from '../../../services/mapfre.service';
import {ExternalsService} from "../../../services/externals.service";
import {ParteService} from "../../../services/parte.service";
import {ContextGateController} from "../../../services/context-gate-controller.service";
import {CameraMock} from "../../../services/mocks/camera.mock";


@Component({
  selector: 'message-camera-intent',
  templateUrl: 'message_cameraIntent.template.html'
})
export class MessageCameraIntentComponent implements OnInit{

  @ViewChild('videoOutput') videoOut: ElementRef;

  @Input() public message: Message;
  // 0 for CAMERA, 1 for VIDEO or any for both **** NOT YET IMPLEMENTED *****
  @Input() public intentType: number;

  //This will emit the cancel event that will block the input in case we want it to happen
  @Output() private blockInput:EventEmitter<Object> = new EventEmitter();

  public imgRetrieved: boolean = false;
  public isAllDone:boolean = false;
  public locked:boolean = false;
  /*public videoRetrieved: boolean = false;*/

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
/*  TODO: may be implemented
  private default_videoCamera_options: CaptureVideoOptions = {
    limit: 1,
    duration: 20
  };*/
  public base64ImageString: string;

  constructor(
    private camera: Camera,
    private mapfre: MapfreService,
    private toast: ToastController,
    private externals: ExternalsService,
    private parte:ParteService,
    private gate:ContextGateController
    /*private mediaCapture: MediaCapture*/) {


  }
  public toggleLock(){
    console.log('TOGGLIng');
    this.locked = !this.locked;
    this.blockInput.emit({lock: this.locked});

  }

  public presentToast(m: string, position: string, duration: number) {
    let toast = this.toast.create({
      message: m,
      duration: duration,
      position: position
    });


    toast.present();
  }



  sendImage() {

    this.parte.base64_accidente = this.base64ImageString;
    this.isAllDone = true;
    this.gate.sendInvisibleMessage('VideoFinalizado');
    this.presentToast('Imagen Enviada...', 'bottom',1000);
    this.toggleLock();


  }

  /*sendVideo(){} -- TODO: may be implemented*/



  public getImage() {



    //Camera.getPicture returns a Promise, so should implement success and error cb functions
    console.log('Getting Photo');
    this.camera.getPicture(this.default_camera_options).then((imageData) => {

      // data is base64:

      this.base64ImageString = imageData + '';
      this.imgRetrieved = true;


    }, (err) => {
      this.presentToast(`Some error ocurred: ${err.m}`, 'top', 3000);
    });


  }

  ngOnInit(): void {

    this.toggleLock();
  }

  /*
  TODO: may be implemented
  getVideo() {

    //MediaCapture.captureVideo() returns a Promise, so should implement success and error cb functions
    console.log('Getting Video');
    this.mediaCapture.captureVideo(this.default_videoCamera_options).then(
      (videoData: MediaFile[]) => {

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

        this.presentToast(`Some error ocurred: ${err.m}`, 'top', 3000);


      });


  }*/


}
