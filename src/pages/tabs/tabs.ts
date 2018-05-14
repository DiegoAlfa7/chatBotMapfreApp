import { Component } from '@angular/core';
import { VanillaPage } from "../vanilla/vanilla";
import { LoginPage } from '../login/login';

import { MapfrecitoComponent } from "../mapfrecito/mapfrecito.component";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapfrecitoComponent;
  tab2Root = LoginPage;


  constructor() {

  }
}
