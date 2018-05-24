import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { MapfrecitoComponent } from '../mapfrecito/mapfrecito.component';
import {ParteService} from "../../services/parte.service";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  public pw = '';
  public nombreUsuario='';

  public jsonUser = {

    name:''

  };


  constructor(public navCtrl: NavController, public navParams: NavParams,private parte:ParteService,
  private alert:AlertController) {
  }

   ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.nombreUsuario = '';
    this.pw = '';
    if(this.parte.parteEnviado){


      this.showConfirm();

    }
  }



  showConfirm() {
    let confirm = this.alert.create({
      title: `REF : ${Math.floor((Math.random() * 12343546) + 1)}`,
      message: `Estimado ${this.parte.asegurado1.nombre}, le informamos del número de referencia con el que se ha registrado su expediente \n GRACIAS POR CONFIAR EN NEO-COVER`,
      buttons: [
        {
          text: 'OK',
          handler: () =>{

            this.parte.reset();

          }
        }
      ]
    });
    confirm.present();
  }

  irChatInvitado() {
    this.navCtrl.push(MapfrecitoComponent);
  }

  irChatLoggeado() {
    if(this.nombreUsuario.length < 1 || this.pw.length < 1) return;
    this.jsonUser.name = this.nombreUsuario;
    console.log(this.jsonUser);
    this.navCtrl.push(MapfrecitoComponent, this.jsonUser);
  }


}
