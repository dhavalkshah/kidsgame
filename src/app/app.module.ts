import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LevelPage } from '../pages/level/level';
import { GameChoicePage } from '../pages/game-choice/game-choice';
import { GamePage } from '../pages/game/game';
import { StorageProvider } from '../providers/storage/storage';
import { AdmobProvider } from '../providers/admob/admob';
import { GlobalVarsProvider } from '../providers/global-vars/global-vars';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { NativeStorage } from '@ionic-native/native-storage';
// import { ComponentsModule } from '../components/components.module';
import { HintComponent } from '../components/hint/hint';


@NgModule({
  declarations: [
    MyApp,
    GameChoicePage,
    LevelPage,
    GamePage,
    HintComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GameChoicePage,
    LevelPage,
    GamePage,
    HintComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageProvider,
    AdmobProvider,
    GlobalVarsProvider,
    AdMobFree,
    NativeStorage
  ]
})
export class AppModule {}
