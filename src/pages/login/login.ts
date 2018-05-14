import { Component } from '@angular/core';
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

  public nombreUsuario;

  public jsonUser = {

    name:''

  }


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  irChatInvitado() {
    this.navCtrl.push(MapfrecitoComponent);
  }

  irChatLoggeado() {
    this.jsonUser.name = this.nombreUsuario;
    console.log(this.jsonUser);
    this.navCtrl.push(MapfrecitoComponent, this.jsonUser);
  }

}
