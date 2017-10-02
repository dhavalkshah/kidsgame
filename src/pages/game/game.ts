import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { GlobalVarsProvider } from '../../providers/global-vars/global-vars';
import { StorageProvider } from '../../providers/storage/storage';
import { ComponentsModule } from '../../components/components.module';
import { HintComponent } from '../../components/hint/hint';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public game: string;
  public level: string;
  public crossWord: boolean;
  public numberPyramid: boolean;
  public numberSudoku: boolean;
  public pictureSudoku: boolean;
  public numberPyramidData: any = [];
  public numHint: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appVars: GlobalVarsProvider,
    public hintCtrl: PopoverController,
    public db: StorageProvider) {
    this.db.get('numHint')
      .subscribe((data) => {
        this.numHint = Number(JSON.stringify(data));
        if (!this.numHint) { this.numHint = 5; }
      },
      (err) => {
        this.numHint = 5;
        console.log(err);
        console.log('Got error while checking the number of hints from db');
      })
    this.game = navParams.get('game');
    this.level = navParams.get('level');
    console.log(this.numberPyramidData);
    if (this.game == '1') {
      this.crossWord = false;
      this.numberPyramid = true;
      this.numberSudoku = true;
      this.pictureSudoku = true;
    }
    else if (this.game == '2') {
      this.crossWord = true;
      this.numberPyramid = false;
      this.numberSudoku = true;
      this.pictureSudoku = true;
      this.numberPyramidData = this.appVars.selectPyramidGame(this.level);
    }
    else if (this.game == '3') {
      this.crossWord = true;
      this.numberPyramid = true;
      this.numberSudoku = false;
      this.pictureSudoku = true;
    }
    else if (this.game == '4') {
      this.crossWord = true;
      this.numberPyramid = true;
      this.numberSudoku = true;
      this.pictureSudoku = false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage:' + this.game + ' ' + this.level);
  }
  valChange(evt: any, row: any, col: any, rowIdx: number, colIdx: number) {
    if (this.checkGameOver() === 0) {
      console.log('The game is over');
    }
    else {
      console.log('The game is not over');
    }
  }
  checkGameOver() {
    if(this.numberPyramid === false){
      return this.checkPyramidGameOver();
    }
  }
  checkPyramidGameOver(){
    let row: number, col: number, rowLen: number, colLen: number, ret: number;
    rowLen = this.numberPyramidData.length;
    ret = 0;
    for (row = 0; row < rowLen; row++) {
      console.log(this.numberPyramidData[row]);
      colLen = this.numberPyramidData[row].length;
      for (col = 0; col < colLen; col++) {
        console.log(this.numberPyramidData[row][col].data + ' ' + this.numberPyramidData[row][col].actualInput);
        if (this.numberPyramidData[row][col].data !== this.numberPyramidData[row][col].actualInput) {
          ret = -1
        }
      }
    }
    return ret;
  }
  printNewArray() {
    console.log(this.numberPyramidData);
  }
  checkHints(evt: any) {
    let hintPresenter = this.hintCtrl.create(HintComponent);
    hintPresenter.present({ ev: evt });
    hintPresenter.onDidDismiss((data) => {
      if (data) {
        if (data.action == 'rewardVideoComplete') {
          this.numHint = this.numHint + data.incrHint;
          this.db.set('numHint', this.numHint);
        }
      }
    })
  }
}
