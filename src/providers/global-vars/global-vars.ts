import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalVarsProvider {
  public adDetails: any = {};
  public bgColors: any = {};
  public numberPyramidGameData = {};

  constructor() {
    console.log('Hello GlobalVarsProvider Provider');
    this.adDetails.appId = 'ca-app-pub-4231063339059842~2735596058';
    this.adDetails.bannerUnitId = 'ca-app-pub-4231063339059842/9819879159';
    this.adDetails.interstitialId = 'ca-app-pub-4231063339059842/3844942834';
    this.adDetails.rewardId = 'ca-app-pub-4231063339059842/6619936525';
    this.bgColors.primary = '#488aff';
    this.bgColors.secondary = '#32db64';
    this.bgColors.danger = '#f53d3d';
    this.bgColors.light = '#f4f4f4';
    this.bgColors.dark = '#222';
    this.bgColors.err = '#FFDC9B';
    this.numberPyramidGameData = {
      '1': [
        [ //game 0
          [{ data: '7', color: 'primary', placeholder: '', hint: 0, backgroundColor: this.bgColors.light, actualInput: '7' }],
          [
            { data: '2', color: 'secondary', placeholder: '?', hint: 1, backgroundColor: '', actualInput: '' },
            { data: '5', color: 'secondary', placeholder: '?', hint: 2, backgroundColor: '', actualInput: '' }
          ],
          [
            { data: '1', color: 'primary', placeholder: '', hint: 0, backgroundColor: this.bgColors.light, actualInput: '1' },
            { data: '2', color: 'primary', placeholder: '', hint: 0, backgroundColor: this.bgColors.light, actualInput: '2' },
            { data: '3', color: 'secondary', placeholder: '?', hint: 3, backgroundColor: '', actualInput: '' }
          ]
        ],
        [ //game 0
          [{ data: '7', color: 'primary', placeholder: '', hint: 3, backgroundColor: '', actualInput: '' }],
          [
            { data: '2', color: 'secondary', placeholder: '?', hint: 1, backgroundColor: '', actualInput: '' },
            { data: '5', color: 'secondary', placeholder: '?', hint: 2, backgroundColor: '', actualInput: '' }
          ],
          [
            { data: '1', color: 'primary', placeholder: '', hint: 0, backgroundColor: this.bgColors.light, actualInput: '1' },
            { data: '2', color: 'primary', placeholder: '', hint: 0, backgroundColor: this.bgColors.light, actualInput: '2' },
            { data: '3', color: 'secondary', placeholder: '?', hint: 0, backgroundColor: this.bgColors.light, actualInput: '3' }
          ]
        ]
      ],
      '2': [],
      '3': [],
      '4': []
    };
  }
  selectPyramidGame(lvl:string){
    let randLvl:number;
    randLvl = Math.floor(Math.random()*this.numberPyramidGameData[lvl].length);
    console.log(randLvl);
    return this.numberPyramidGameData[lvl][randLvl];
  }
}
