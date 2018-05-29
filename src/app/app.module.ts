import { FormularioPage } from './../pages/formulario/formulario';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
//Modules
import { IonicApp, IonicErrorHandler, IonicModule, Platform, ToastController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
//PAGES
import { LoginPage } from '../pages/login/login';
import { MapfrecitoComponent } from '../pages/mapfrecito/mapfrecito.component';
import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { HttpClientModule } from '@angular/common/http';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
//SERVICES
import { MapfreService } from '../services/mapfre.service';
import { TokenService } from '../services/token.service';
import { ContextGateController } from '../services/context-gate-controller.service';
import { ExternalsService } from '../services/externals.service';
import { MessagesService } from '../services/messages.service';
import { ParteService } from '../services/parte.service';

import { CameraMock } from '../services/mocks/camera.mock';
import { MediaCaptureMock } from '../services/mocks/media-capture.mock';
import { MediaMock, MediaObjectMock } from '../services/mocks/media.mock';
import { FileMock } from '../services/mocks/file.mock';
//Components
import { MyApp } from './app.component';
import { MessageAudioIntentComponent } from '../components/message/message_audioIntent/message_audioIntent.component';
import { MessageVideoIntentComponent } from '../components/message/message-video-intent/message-video-intent.component';
import { MessageAbstract } from '../components/message/message_abstract.component';
import { MessageTextComponent } from '../components/message/message_text/message_text.component';
import { MessageButtonsComponent } from '../components/message/message-buttons/message-buttons.component';
import { MessageCameraIntentComponent } from '../components/message/message_photoIntent/message_cameraIntent.component';
import { MessageMatriculaIntentComponent } from '../components/message/message_matriculaIntent/message_matriculaIntent.component';

import { cameraProvider, mediaProvider, mediaCaptureProvider, fileProvider } from './providers.factory';

import { SanitizerPipe } from '../pipes/sanitizer.pipe';

@NgModule({
  declarations: [
    MyApp,
    MessageTextComponent,
    MessageButtonsComponent,
    MapfrecitoComponent,
    MessageAbstract,
    FormularioPage,
    MessageAudioIntentComponent,
    MessageVideoIntentComponent,
    LoginPage,
    MessageCameraIntentComponent,
    MessageMatriculaIntentComponent,
    SanitizerPipe
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],

  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    MessageTextComponent,
    MessageButtonsComponent,
    MapfrecitoComponent,
    MessageAbstract,
    MessageCameraIntentComponent,
    MessageMatriculaIntentComponent,
    MessageAudioIntentComponent,
    MessageVideoIntentComponent,
    FormularioPage,
    LoginPage
  ],

  providers:[
    StatusBar,
    SplashScreen,
    ToastController,
    MapfreService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ContextGateController,
    ExternalsService,
    MessagesService,
    ParteService,
    TokenService,
    { provide: Camera, useFactory: cameraProvider, deps: [Platform] },
    { provide: MediaCapture, useFactory: mediaCaptureProvider, deps: [Platform] },
    { provide: Media, useFactory: mediaProvider, deps: [Platform] },
    { provide: File, useFactory: fileProvider, deps: [Platform] }
  ]
})
export class AppModule { }
