import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapfrecitoComponent } from '../mapfrecito/mapfrecito.component';

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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  private ionViewWillEnter() {

    this.nombreUsuario = '';
    this.pw = '';


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
