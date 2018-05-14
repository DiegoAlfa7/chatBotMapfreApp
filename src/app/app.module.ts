import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {MapfrecitoComponent} from "../pages/mapfrecito/mapfrecito.component";
import {MessageComponent} from "../components/message/message";




//SERVICES
import { MapfreService } from '../services/mapfre.service';

import { HttpClientModule } from '@angular/common/http';
import {HomePage} from "../pages/home/home";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapfrecitoComponent,
    MessageComponent

  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)


  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    HomePage,
    MapfrecitoComponent,
    MessageComponent
  ],

  providers: [
    StatusBar,
    SplashScreen,

    MapfreService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule { }
