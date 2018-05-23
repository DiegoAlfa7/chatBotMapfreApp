import {AfterViewChecked, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../../app/classes/Message';
import {NavController, Platform, ToastController} from 'ionic-angular';
import {CaptureError, MediaCapture} from '@ionic-native/media-capture';
import {File} from '@ionic-native/file';
import {Storage} from '@ionic/storage';
import {Media, MediaObject} from '@ionic-native/media';
import {ParteService} from '../../../services/parte.service';
import {ContextGateController} from '../../../services/context-gate-controller.service';


const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-message_audioIntent',
  templateUrl: './message_audioIntent.component.html'
})

export class MessageAudioIntentComponent implements OnInit{
  mediaFiles = [];
  @Input() public message: Message;

  //This will emit the cancel event that will block the input in case we want it to happen
  @Output() private blockInput:EventEmitter<Object> = new EventEmitter(true);

  private fileName:string;
  private filePath:string;
  private mediaObject:MediaObject;
  private isAllDone:boolean = false;
  private playing: boolean = false;
  private recording: boolean = false;
  private audioRetrieved: boolean = false;
  private locked: boolean;
  private fileURL:string;

  constructor(public toast:ToastController,
              private platform:Platform,
              private mediaCapture: MediaCapture,
              private storage: Storage,
              private file: File,
              private media: Media,
              private gate:ContextGateController,
              private parte:ParteService) { }


    public startRecord() {
      if (this.platform.is('ios')) {
        this.fileName = 'observacion' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
        this.filePath = this.file.documentsDirectory + this.fileName;
        this.mediaObject = this.media.create(this.filePath);
      } else if (this.platform.is('android') || this.platform.is('core')) {
        this.fileName = 'observacion' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
        this.filePath = this.file.externalDataDirectory + this.fileName;
        this.mediaObject = this.media.create(this.filePath);
      }
      this.mediaObject.startRecord();
      if (!this.platform.is('core')) {
        this.file.resolveLocalFilesystemUrl(this.filePath).then((onfullfilled)=>{

                this.fileURL = onfullfilled.toURL();

        });
      }
      this.recording = true;
    }

    public stopRecord() {
      console.log('Fin');
      this.audioRetrieved = true;
      this.mediaObject.stopRecord();
      this.recording = false;

    }

    playAudio() {
      this.mediaObject.seekTo(0);
      this.mediaObject.play();
      this.playing = true;
      this.mediaObject.setVolume(0.8);


    }
    stopAudio(){


        this.mediaObject.stop();
        this.playing = false;



    }

    public repetirAudio(){

      this.audioRetrieved = false;

    }

  sendAudio(){

    this.parte.url_audioAccidente = this.fileURL;
    this.parte.path_audioAccidente = this.filePath;
    this.isAllDone = true;
    this.toggleLock();
    this.presentToast('Audio Enviado...', 'bottom' ,1000);
    let s = this.parte.getDescripcionAccidenteFinalizada();
    console.log(s);
    this.gate.sendInvisibleMessage(s);


  }

  public presentToast(m: string, position: string, duration: number) {
    let toast = this.toast.create({
      message: m,
      duration: duration,
      position: position
    });
  }

  public toggleLock(){

    this.locked = !this.locked;
    this.blockInput.emit({lock: this.locked});

  }

  ngOnInit(): void {

    this.toggleLock();

  }


}
