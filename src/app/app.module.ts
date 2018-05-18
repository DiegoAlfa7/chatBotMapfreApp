import { FormularioPage } from './../pages/formulario/formulario';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
//Modules
import { IonicApp, IonicErrorHandler, IonicModule, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//PAGES
import { LoginPage } from '../pages/login/login';
import { MapfrecitoComponent } from "../pages/mapfrecito/mapfrecito.component";
import { Camera } from "@ionic-native/camera";
import { MediaCapture } from "@ionic-native/media-capture";
import { HttpClientModule } from '@angular/common/http';
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
//SERVICES
import { MapfreService } from '../services/mapfre.service';
//Components
import { MyApp } from './app.component';
import { MessageAudioIntentComponent } from '../components/message/message_audioIntent/message_audioIntent.component';
import { MessageAbstract } from "../components/message/message_abstract.component";
import { MessageTextComponent } from "../components/message/message_text/message_text.component";
import { MessageCameraIntentComponent } from "../components/message/message_photoIntent/message_cameraIntent.component";
import { CameraMock } from '../services/mocks/camera.mock';
import { SanitizerPipe } from '../pipes/sanitizer.pipe';
import {ContextGateController} from "../services/context-gate-controller.service";
import {ExternalsService} from "../services/externals.service";
import {MessagesService} from "../services/messages.service";
import {ParteService} from "../services/parte.service";





@NgModule({
  declarations: [
    MyApp,
    MessageTextComponent,
    MapfrecitoComponent,
    MessageAbstract,
    FormularioPage,
    MessageAudioIntentComponent,
    LoginPage,
    MessageCameraIntentComponent,
    SanitizerPipe

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
    MessageCameraIntentComponent,
    MessageAudioIntentComponent,
    FormularioPage,
    LoginPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    Camera, CameraMock,
    ToastController,
    MapfreService,
    MediaCapture,
    Media,
    File,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ContextGateController,
    ExternalsService,
    MessagesService,
    ParteService

  ]
})
export class AppModule { }
