import { FormularioPage } from './../../../pages/formulario/formulario';
import { Component, Input } from '@angular/core';
import { Message } from "../../../app/classes/Message";
import { NavController, Platform } from 'ionic-angular';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'app-message_audioIntent',
  templateUrl: './message_audioIntent.component.html'
})
export class MessageAudioIntentComponent {

  @Input() public message: Message;

  recording: boolean = false;
  audioRetrieved: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  constructor(public navCtrl: NavController, private media: Media, private file: File, public platform: Platform, private toastCtrl: ToastController) { }

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




}
