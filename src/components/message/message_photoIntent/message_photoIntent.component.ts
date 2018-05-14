import {Component, Input} from '@angular/core';
import {Message} from "../../../app/classes/Message";
import {Camera, CameraOptions} from "@ionic-native/camera";


/**
 * Generated class for the MessageAbstract component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
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

  constructor( private camera:Camera) {




  }

  getImage(){


    //Camera.getPicture returns a Promise, so should implement success and error cb functions

    this.camera.getPicture(this.default_options).then((imageData) => {

      // data is base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.base64ImageString = base64Image;
      this.imgRetrieved = true;


    }, (err) => {
      // Handle error
    });




  }

}
