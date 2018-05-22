import {Component, Input} from '@angular/core';
import {Message} from "../../../app/classes/Message";
import {NavController, ToastController} from 'ionic-angular';
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

export class MessageAudioIntentComponent {
  mediaFiles = [];
  @Input() public message: Message;
  private isAllDone:boolean = false;

  recording: boolean = false;
  audioRetrieved: boolean = false;

  constructor(public toast:ToastController,
              public navCtrl: NavController,
              private mediaCapture: MediaCapture,
              private storage: Storage,
              private file: File,
              private media: Media,
              private parte:ParteService) { }

  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    })
  }

  captureAudio() {
    this.recording = true;

    this.mediaCapture.captureAudio().then(res => {
        this.storeMediaFiles(res);
        this.recording = false;
      },
      (err: CaptureError) => {
        this.presentToast('Hubo un error grabando el audio:' + err, 'bottom', 3000);
      });
  }

  public presentToast(m: string, position: string, duration: number) {
    let toast = this.toast.create({
      message: m,
      duration: duration,
      position: position
    });


    toast.present();
  }

  sendAudio(){

    this.parte.url_audioAccidente = this.mediaFiles[0];
    this.isAllDone = true;
    this.presentToast('Audio Enviado...', 'bottom' ,1000);


  }

  repetirAudio(){

    this.mediaFiles = [];

  }

  play(myFile) {
    const audioFile: MediaObject = this.media.create(myFile.localURL);
    audioFile.play();
  }

  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    })
  }















  /*
    verInforme() {
      this.navCtrl.push(FormularioPage);
    }

    getAudioList() {
      if (localStorage.getItem("audiolist")) {
        this.audioList = JSON.parse(localStorage.getItem("audiolist"));
        console.log(this.audioList);
      }
    }

    public startRecord() {
      this.audioList.splice(1);
      if (this.platform.is('ios')) {
        this.fileName = 'observacion' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
        this.filePath = this.file.documentsDirectory + this.fileName;
        this.audio = this.media.create(this.filePath);
      } else if (this.platform.is('android')) {
        this.fileName = 'observacion' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
        this.filePath = this.file.externalDataDirectory + this.fileName;
        this.audio = this.media.create(this.filePath);
      }
      this.audio.startRecord();
      let ruta = this.file.resolveLocalFilesystemUrl(this.filePath);
      this.recording = true;
    }

    public stopRecord() {
      console.log("Fin");
      this.audioRetrieved = true;
      this.audio.stopRecord();
      let data = { filename: this.fileName };
      this.audioList.push(data);
      localStorage.setItem("audiolist", JSON.stringify(this.audioList));
      this.recording = false;
      this.getAudioList();
    }

    playAudio() {

      this.audio.play();
      this.audio.setVolume(0.8);


    }

    public repetirAudio(){

      this.audioRetrieved = false;



    }
  */



}
