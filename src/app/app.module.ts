import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//PAGES
import { HomePage } from '../pages/home/home';
import { TabsPage } from "../pages/tabs/tabs";
import { VanillaPage } from "../pages/vanilla/vanilla";
import { MapfrecitoComponent } from "../pages/mapfrecito/mapfrecito.component";
import { LoginPage } from '../pages/login/login';

//COMPONENTS
import { MessageComponent } from "../components/message/message";

//CAMERA
import { Camera } from '@ionic-native/camera';

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
    HomePage,
    TabsPage,
    VanillaPage,
    LoginPage,
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
    HomePage,
    TabsPage,
    VanillaPage,
    LoginPage,
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
    { provide: ErrorHandler, useClass: IonicErrorHandler }

  ]
})
export class AppModule { }
