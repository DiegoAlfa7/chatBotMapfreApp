import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {MapfrecitoComponent} from "../pages/mapfrecito/mapfrecito.component";
import {MessageAbstract} from "../components/message/message_abstract.component";




//SERVICES
import { MapfreService } from '../services/mapfre.service';

import { HttpClientModule } from '@angular/common/http';
import {MessageTextComponent} from "../components/message/message_text/message_text.component";



@NgModule({
  declarations: [
    MyApp,
    MessageTextComponent,
    MapfrecitoComponent,
    MessageAbstract

  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)


  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    MessageTextComponent,
    MapfrecitoComponent,
    MessageAbstract
  ],

  providers: [
    StatusBar,
    SplashScreen,

    MapfreService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule { }
