import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MapfreService } from '../../services/mapfre.service';

/**
 * Generated class for the VanillaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-vanilla',
  templateUrl: 'vanilla.html',
})
export class VanillaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: MapfreService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.service.sendQuery('qweq').subscribe(data => {

    })
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad VanillaPage');

  }


}
