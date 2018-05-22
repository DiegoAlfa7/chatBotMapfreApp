import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ParteService} from "../../services/parte.service";
import {Insured} from "../../app/classes/Insured";
import {Media, MediaObject} from "@ionic-native/media";

/**
 * Generated class for the FormularioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-formulario',
  templateUrl: 'formulario.html',
})
export class FormularioPage {

  private asegurado1:Insured;
  private asegurado2:Insured;

  private base64_matricula1:string;
  private base64_matricula2:string;

  private base64_accidente:string;

  private mediaObject:MediaObject;
  private playing:boolean = false;



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public parte:ParteService,
              public media:Media) {
    this.asegurado1 = this.parte.asegurado1;
    this.asegurado2 = this.parte.asegurado2;

    this.base64_matricula1 = this.parte.matricula_coche_1;
    this.base64_matricula2 = this.parte.matricula_coche_2;

    this.base64_accidente = this.parte.base64_accidente;
  }

  ionViewWillEnter() {

    this.asegurado1 = this.parte.asegurado1;
    this.asegurado2 = this.parte.asegurado2;

    this.base64_matricula1 = this.parte.matricula_coche_1;
    this.base64_matricula2 = this.parte.matricula_coche_2;

    this.base64_accidente = this.parte.base64_accidente;

    console.log(this.asegurado1);




  }

  public printInsured(){


    console.log(this.asegurado1);

  }

  private playAudio(){

    if(!this.mediaObject){

      this.mediaObject = this.media.create(this.parte.path_audioAccidente);

    }
    this.mediaObject.seekTo(0);
    this.mediaObject.setVolume(0.8);
    this.playing = true;
    this.mediaObject.play();

  }

  private stopAudio(){

    this.mediaObject.stop();
    this.playing = false;

  }

}
