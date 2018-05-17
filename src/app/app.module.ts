
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


//PAGES
import { LoginPage } from '../pages/login/login';
import { MapfrecitoComponent } from "../pages/mapfrecito/mapfrecito.component";




//Modules
import { Camera } from "@ionic-native/camera";
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { NativeAudio } from "@ionic-native/native-audio"
import { HttpClientModule } from '@angular/common/http';

//SERVICES
import { MapfreService } from '../services/mapfre.service';
//Components
import { MyApp } from './app.component';
import { MessageAbstract } from "../components/message/message_abstract.component";
import { MessageTextComponent } from "../components/message/message_text/message_text.component";
import { MessagePhotoIntentComponent } from "../components/message/message_photoIntent/message_photoIntent.component";
import { MessageAudioIntentComponent } from '../components/message/message_audioIntent/message_audioIntent.component';



@NgModule({
  declarations: [
    MyApp,
    MessageTextComponent,
    MapfrecitoComponent,
    MessageAbstract,
    MessageTextComponent,
    LoginPage,
    MessagePhotoIntentComponent,
    MessageAudioIntentComponent

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
    MessagePhotoIntentComponent,
    MessageAudioIntentComponent,
    LoginPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    MapfreService,
    Media,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler }

  ]
})
export class AppModule { }
