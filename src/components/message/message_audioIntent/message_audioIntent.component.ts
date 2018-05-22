import {AfterViewChecked, Component, EventEmitter, Input, Output} from '@angular/core';
import {Message} from "../../../app/classes/Message";
import {NavController, Platform, ToastController} from 'ionic-angular';
import {CaptureError, MediaCapture} from '@ionic-native/media-capture';
import {File} from '@ionic-native/file';
import {Storage} from '@ionic/storage';
import {Media, MediaObject} from '@ionic-native/media';
import {ParteService} from "../../../services/parte.service";

const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-message_audioIntent',
  templateUrl: './message_audioIntent.component.html'
})

export class MessageAudioIntentComponent implements AfterViewChecked{
  mediaFiles = [];
  @Input() public message: Message;

  //This will emit the cancel event that will block the input in case we want it to happen
  @Output() private blockInput:EventEmitter<Object> = new EventEmitter();

  private fileName:string;
  private filePath:string;
  private mediaObject:MediaObject;
  private isAllDone:boolean = false;

  recording: boolean = false;
  audioRetrieved: boolean = false;
  private locked: boolean;

  constructor(public toast:ToastController,
              private platform:Platform,
              private mediaCapture: MediaCapture,
              private storage: Storage,
              private file: File,
              private media: Media,
              private parte:ParteService) { }


    public startRecord() {

      if (this.platform.is('ios')) {
        this.fileName = 'observacion' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
        this.filePath = this.file.documentsDirectory + this.fileName;
         this.mediaObject = this.media.create(this.filePath);
      } else if (this.platform.is('android')) {
        this.fileName = 'observacion' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
        this.filePath = this.file.externalDataDirectory + this.fileName;
        this.mediaObject = this.media.create(this.filePath);
      }
      this.mediaObject.startRecord();
      let ruta = this.file.resolveLocalFilesystemUrl(this.filePath);
      this.recording = true;
    }

    public stopRecord() {
      console.log("Fin");
      this.audioRetrieved = true;
      this.mediaObject.stopRecord();
      this.recording = false;

    }

    playAudio() {

      this.mediaObject.play();
      this.mediaObject.setVolume(0.8);


    }

    public repetirAudio(){

      this.audioRetrieved = false;

    }

  sendAudio(){

    this.parte.url_audioAccidente = this.filePath;
    this.isAllDone = true;
    this.presentToast('Audio Enviado...', 'bottom' ,1000);


  }

  public presentToast(m: string, position: string, duration: number) {
    let toast = this.toast.create({
      message: m,
      duration: duration,
      position: position
    });
  }

  public toggleLock(){
    console.log('TOGGLIng');
    this.locked = !this.locked;
    this.blockInput.emit({lock: this.locked});

  }

  ngAfterViewChecked(): void {

    this.toggleLock();

  }


}
