import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {VanillaPage} from "../vanilla/vanilla";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = VanillaPage;


  constructor() {

  }
}
