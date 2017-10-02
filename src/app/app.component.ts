import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GameChoicePage } from '../pages/game-choice/game-choice';
import { AdmobProvider } from '../providers/admob/admob';
import { StorageProvider } from '../providers/storage/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = GameChoicePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public adMob: AdmobProvider,
    public db: StorageProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.adMob.init();
      this.setDefaultHint();
    });
  }
  setDefaultHint() {
    let numHint: number
    this.db.get('numHint')
      .subscribe((data) => {
        numHint = Number(JSON.stringify(data));
        if (!numHint) { numHint = 4; }
        this.db.set('numHint', numHint);
      },
      (err) => {
        numHint = 4;
        this.db.set('numHint', numHint)
          .subscribe((succ) => {
            console.log('Successfully saved the data');
          },
          (setErr) => {
            console.log('Error while saving the data');
            console.log(setErr);
          })
        console.log(err);
        console.log('Got error while checking the number of hints from db');
      })
  }
}

