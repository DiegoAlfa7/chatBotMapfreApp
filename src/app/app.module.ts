
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


//PAGES
import { LoginPage } from '../pages/login/login';
import { MapfrecitoComponent } from "../pages/mapfrecito/mapfrecito.component";
import { FormularioPage } from '../pages/formulario/formulario';





//Modules
import { Camera } from "@ionic-native/camera";
import { Media } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { NativeAudio } from "@ionic-native/native-audio"
import { Toast } from '@ionic-native/toast';
import { HttpClientModule } from '@angular/common/http';

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



@NgModule({
    declarations: [
        MyApp,
        MessageTextComponent,
        MapfrecitoComponent,
        MessageAbstract,
        MessageTextComponent,
        LoginPage,
        FormularioPage,
        MessageAudioIntentComponent,
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
        MessageTextComponent,
        MessageAudioIntentComponent,
        MessageCameraIntentComponent,
        LoginPage,
        FormularioPage
    ],

    providers: [
        StatusBar,
        SplashScreen,
        Camera, CameraMock,
        Toast,
        MapfreService,
        Media,
        File,
        { provide: ErrorHandler, useClass: IonicErrorHandler }

    ]
})
export class AppModule { }
