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

//SERVICES
import { MapfreService } from '../services/mapfre.service';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    VanillaPage,
    LoginPage,
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
    TabsPage,
    VanillaPage,
    LoginPage,
    MapfrecitoComponent,
    MessageComponent
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
