import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';





//Modules
import {Camera} from "@ionic-native/camera";
import { HttpClientModule } from '@angular/common/http';

//SERVICES
import { MapfreService } from '../services/mapfre.service';

//Components
import { MyApp } from './app.component';
import {MapfrecitoComponent} from "../pages/mapfrecito/mapfrecito.component";
import {MessageAbstract} from "../components/message/message_abstract.component";
import {MessageTextComponent} from "../components/message/message_text/message_text.component";
import {MessagePhotoIntentComponent} from "../components/message/message_photoIntent/message_photoIntent.component";



@NgModule({
  declarations: [
    MyApp,
    MessageTextComponent,
    MapfrecitoComponent,
    MessageAbstract,
    MessageTextComponent,
    MessagePhotoIntentComponent

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
    MessageAbstract,
    MessageTextComponent,
    MessagePhotoIntentComponent
  ],

  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    MapfreService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}

  ]
})
export class AppModule { }
