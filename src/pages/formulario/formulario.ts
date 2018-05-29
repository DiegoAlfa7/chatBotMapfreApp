import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ParteService} from "../../services/parte.service";
import {Insured} from "../../app/classes/Insured";
import {Media, MediaObject} from "@ionic-native/media";
import {MessagesService} from "../../services/messages.service";
import {ContextGateController} from "../../services/context-gate-controller.service";

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

  private asegurado1: Insured;
  private asegurado2: Insured;

  private base64_matricula1: string;
  private base64_matricula2: string;

  private base64_accidentes: string[];
  private urlVideoAccidente: string;

  public fechaS_asegurado1: string;
  public fechaS_asegurado2: string;

  private mediaObject:MediaObject;
  private playing:boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public parte: ParteService,
              public media:Media,
              public messages:MessagesService,
              public gate:ContextGateController) {

    this.asegurado1 = this.parte.asegurado1;
    this.asegurado2 = this.parte.asegurado2;

    this.base64_matricula1 = this.parte.matricula_coche_1;
    this.base64_matricula2 = this.parte.matricula_coche_2;

    this.base64_accidentes = this.parte.base64_accidentes;
    this.urlVideoAccidente = this.parte.urlVideoAccidente;
  }

  hasVideo () {
    return this.urlVideoAccidente && this.urlVideoAccidente.length > 0 ? true : false;
  }

  hasImages () {
    return this.base64_accidentes && this.base64_accidentes.length > 0 ? true : false;
  }

  hasAudio () {
    return this.mediaObject ? true : false;
  }

  ionViewWillEnter() {

    this.asegurado1 = this.parte.asegurado1;
    this.asegurado2 = this.parte.asegurado2;

    this.base64_matricula1 = this.parte.matricula_coche_1;
    this.base64_matricula2 = this.parte.matricula_coche_2;

    this.base64_accidentes = this.parte.base64_accidentes;
    this.urlVideoAccidente = this.parte.urlVideoAccidente;

    console.log('1: ->'+this.asegurado1 );
    console.log('2: ->'+this.asegurado2);

    if(this.asegurado1.c_verde_val) {
      this.fechaS_asegurado1 = this.getISOStringfromDate(this.asegurado1.c_verde_val);
    }

    if(this.asegurado2.c_verde_val) {
      this.fechaS_asegurado2 = this.getISOStringfromDate(this.asegurado2.c_verde_val);
    }
  }

  /**
   * This onli works for string representation of any Date following the next format: 'DD-MM-YYY'
   */
  private getISOStringfromDate(date:string):string{

    let separated:string[] = date.split('-');
    let day = separated[0];
    let month = separated[1];
    let year = separated[2];

    let dateObject:Date = new Date();

    dateObject.setFullYear(Number(year), Number(month) - 1, Number(day));

    return dateObject.toISOString();

  }

  setFecha1(string:string){

    let date:Date = new Date(Date.parse(string));

    let day = date.getDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear() ;

      this.asegurado1.c_verde_val = `${day}-${month}-${year}`;
      /*this.fechaS_asegurado1 = this.getISOStringfromDate(this.asegurado1.c_verde_val);*/
      this.parte.asegurado1 = this.asegurado1;

  }

  setFecha2(string:string){

    let date:Date = new Date(Date.parse(string));

    let day = date.getDay();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    this.asegurado2.c_verde_val = `${day}-${month}-${year}`;
    /*this.fechaS_asegurado2 = this.getISOStringfromDate(this.asegurado2.c_verde_val);*/
    this.parte.asegurado2 = this.asegurado2;

  }

  public printInsured() {


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
  private goOut(){

   console.log('Logging out...');
   this.gate.sendInvisibleMessage('Adios');
   setTimeout(this.messages.reset(), 500);
   this.parte.parteEnviado = true;

   this.navCtrl.popToRoot();


  }

}
