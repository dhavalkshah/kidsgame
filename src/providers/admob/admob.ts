import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { GlobalVarsProvider } from '../global-vars/global-vars';
import { Observable } from "rxjs/Observable";
import { Events } from 'ionic-angular';

@Injectable()
export class AdmobProvider {
  private bannerConfig: AdMobFreeBannerConfig = {};
  private interstitialConfig: AdMobFreeInterstitialConfig = {};
  private rewardVideoConfig: AdMobFreeRewardVideoConfig = {};

  constructor(private admobFree: AdMobFree,
    private appVars: GlobalVarsProvider,
    public event: Events) {
    console.log('Hello AdmobProvider Provider');
  }
  init() {
    this.bannerConfig.isTesting = true;
    this.bannerConfig.autoShow = true;
    this.bannerConfig.id = this.appVars.adDetails.bannerUnitId;

    this.interstitialConfig.id = this.appVars.adDetails.interstitialId;
    this.interstitialConfig.isTesting = true;
    this.interstitialConfig.autoShow = true;

    this.rewardVideoConfig.id = this.appVars.adDetails.rewardId;
    this.rewardVideoConfig.autoShow = true;
    this.rewardVideoConfig.isTesting = true;

    this.admobFree.banner.config(this.bannerConfig);
    this.admobFree.interstitial.config(this.interstitialConfig);
    this.admobFree.rewardVideo.config(this.rewardVideoConfig);

    this.registerAdMobEvents();
  }
  async showBannerAd() {
    this.admobFree.banner.prepare()
      .then((succ) => {
        console.log('Showed the ad successfully');
      },
      (err) => {
        console.log('Failed to show the banner ad');
        console.log(err);
      });
  }
  async showInterstitialAd() {
    this.admobFree.interstitial.prepare()
      .then((succ) => {
        console.log('Showing Interstitial Ad');
      },
      (err) => {
        console.log('Failed to show interstitial Ad');
        console.log(err);
      })
  }
  public showRewardAd() {
    this.admobFree.rewardVideo.prepare()
      .then((succ) => {
        console.log('Showing Reward Video');
      },
      (err) => {
        console.log('Failed to show Reward Video');
        console.log(err);
      })
  }

  private registerAdMobEvents() {
    console.log('register events');
    document.addEventListener('admob.banner.events.LOAD_FAIL', (data) => { console.log('BANNER_LOAD_FAIL'); console.log(data) });
    document.addEventListener('admob.banner.events.LOAD', (data) => { console.log('BANNER_LOAD'); console.log(data) });
    document.addEventListener('admob.banner.events.OPEN', (data) => { console.log('BANNER_OPEN'); console.log(data) });
    document.addEventListener('admob.banner.events.CLOSE', (data) => { console.log('BANNER_CLOSE'); console.log(data) });
    document.addEventListener('admob.banner.events.EXIT_APP', (data) => { console.log('BANNER_EXIT_APP'); console.log(data) });
    document.addEventListener('admob.interstitial.events.LOAD_FAIL', (data) => { console.log('interstitial_LOAD_FAIL'); console.log(data) });
    document.addEventListener('admob.interstitial.events.LOAD', (data) => { console.log('interstitial_LOAD'); console.log(data) });
    document.addEventListener('admob.interstitial.events.OPEN', (data) => { console.log('interstitial_OPEN'); console.log(data) });
    document.addEventListener('admob.interstitial.events.CLOSE', (data) => { console.log('interstitial_CLOSE'); console.log(data) });
    document.addEventListener('admob.interstitial.events.EXIT_APP', (data) => { console.log('interstitial_EXIT_APP'); console.log(data) });
    document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', (data) => { console.log('rewardvideo_LOAD_FAIL'); console.log(data) });
    document.addEventListener('admob.rewardvideo.events.LOAD', (data) => { console.log('rewardvideo_LOAD'); console.log(data) });
    document.addEventListener('admob.rewardvideo.events.OPEN', (data) => { console.log('rewardvideo_OPEN'); console.log(data) });
    document.addEventListener('admob.rewardvideo.events.CLOSE', (data) => {
      console.log('rewardvideo_CLOSE');
      console.log(data);
      this.event.publish('rewardVideoCancelled', {});
    });
    document.addEventListener('admob.rewardvideo.events.EXIT_APP', (data) => { console.log('rewardvideo_EXIT_APP'); console.log(data) });
    document.addEventListener('admob.rewardvideo.events.START', (data) => { console.log('rewardvideo_START'); console.log(data) });
    document.addEventListener('admob.rewardvideo.events.REWARD', (data) => {
      console.log('rewardvideo_REWARD');
      console.log(data);
      this.event.publish('rewardVideoComplete', {});
    });
  }
}
