import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdmobProvider } from '../../providers/admob/admob';
import { LevelPage } from '../../pages/level/level';

@Component({
  selector: 'page-game-choice',
  templateUrl: 'game-choice.html',
})
export class GameChoicePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public adMob: AdmobProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameChoicePage');
  }
  ngAfterViewInit() {
    this.adMob.showBannerAd();
  }
  fwdToLevel(game) {
    this.navCtrl.push(LevelPage, { game: game });
  }
  showInterstitialAd() {
    this.adMob.showInterstitialAd();
  }
}
