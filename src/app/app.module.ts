import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {TabsPage} from "../pages/tabs/tabs";
import {VanillaPage} from "../pages/vanilla/vanilla";
import {MapfrecitoComponent} from "../pages/mapfrecito/mapfrecito.component";
import {ComponentsModule} from "../components/components.module";
import {UserMessageComponent} from "../components/user-message/user-message";
import {BotMessageComponent} from "../components/bot-message/bot-message";


//SERVICES
import { MapfreServiceService } from '../services/mapfre.service';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    VanillaPage,
    MapfrecitoComponent,
    UserMessageComponent,
    BotMessageComponent


  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    IonicModule.forRoot(MyApp)
=======
<<<<<<< HEAD
    HttpClientModule,
    IonicModule.forRoot(MyApp)
=======
    IonicModule.forRoot(MyApp),
>>>>>>> 164b2a62bdd4273c48a972628b2a4af4da1406aa

>>>>>>> dfe026e66ea6d4a24e7e1382fa49b17bfccc2e79
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    VanillaPage,
    MapfrecitoComponent,
    UserMessageComponent,
    BotMessageComponent

  ],
  providers: [
    StatusBar,
    SplashScreen,
    MapfreServiceService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
