import { Component } from '@angular/core';
import { ViewController, Events } from 'ionic-angular';
import { AdmobProvider } from '../../providers/admob/admob';

@Component({
  selector: 'hint',
  templateUrl: 'hint.html'
})
export class HintComponent {
  hintList = [{ name: 'Check Errors', action: 'chkErr' }, { name: 'Next Clue', action: 'nxtClue' }, { name: 'Solve Next', action: 'solveNxt' }, { name: 'Solve Puzzle', action: 'solvePuzzle' }, { name: 'Get More Hints', action: 'getExtraHints' }];
  constructor(private viewCtrl: ViewController,
    public adMob: AdmobProvider,
    public event: Events) {
    console.log('Hello HintComponent Component');
  }
  hintAction(action: string) {
    if (action === 'getExtraHints') {
      this.adMob.showRewardAd();
      this.event.subscribe('rewardVideoCancelled',()=>{
        this.event.unsubscribe('rewardVideoCancelled');
        this.event.unsubscribe('rewardVideoComplete');
        console.log('The video is cancelled so nothing doing');
        this.viewCtrl.dismiss({action:action,incrHint:0});        
      });
      this.event.subscribe('rewardVideoComplete',()=>{
        this.event.unsubscribe('rewardVideoCancelled');
        this.event.unsubscribe('rewardVideoComplete');
        console.log('Lets reward with 1 more hint');
        this.viewCtrl.dismiss({action:action,incrHint:1});        
      })
    }
    else{
      this.viewCtrl.dismiss({action:action})
    }
  }

}
