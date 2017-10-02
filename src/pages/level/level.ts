import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../../pages/game/game';

@Component({
  selector: 'page-level',
  templateUrl: 'level.html',
})
export class LevelPage {
  public game: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.game = navParams.get('game');
    console.log(this.game);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelPage');
  }
  fwdToGame(level) {
    this.navCtrl.push(GamePage,{game:this.game, level:level});
  }

}
