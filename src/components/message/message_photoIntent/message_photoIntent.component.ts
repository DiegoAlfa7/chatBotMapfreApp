import {Component, Input} from '@angular/core';
import {Message} from "../../../app/classes/Message";
import {CameraOptions} from "@ionic-native/camera";

//Hay que importar la camara en vez de CaeraMock si queremos que en produción se utilize la cámara nativa
import { Camera } from "@ionic-native/camera";

//---------------------------------
//
//import {Toast} from '@ionic-native/toast'

//import {CameraMock } from '../../../services/mocks/camera.mock'
import { MapfreService } from '../../../services/mapfre.service';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'message-photo-intent',
  templateUrl: 'message_photoIntent.template.html'
})
export class MessagePhotoIntentComponent {

  @Input() public message:Message;
  public imgRetrieved:boolean = false;

  //  destinationType values: --
  //  ------------------------
  // DATA_URL : 0, Return image as base64-encoded string
  // FILE_URI : 1, Return image file URI
  // NATIVE_URI : 2 Return image native URI (e.g., assets-library:// on iOS or content:// on Android)

  private default_options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  

  public base64ImageString:string;

  constructor( 
    private camera:Camera, 
    private mapfre:MapfreService,
    private toastCtrl:ToastController) {




  }

  sendImg(){
    //this.toast should be mock for testing purpouses
    let toast = this.toastCtrl.create({
      message: "Img must have been sended: "+this.base64ImageString.substr(0, 100) + " [...]",
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
    


  }

  getImage(){
  


    //Camera.getPicture returns a Promise, so should implement success and error cb functions
    console.log('Getting Photo');
    this.camera.getPicture(this.default_options).then((imageData) => {

      // data is base64:
      
      this.base64ImageString = imageData+'';
      this.imgRetrieved = true;
     


    }, (err) => {
      // Handle error
    });




  }

}
