import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppSettings } from '../../app/app.settings';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the SubDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ads-detail',
  templateUrl: 'ads-detail.html',
})
export class AdsDetailPage {
 public ads_data :any ={};
  public baseUrl = AppSettings.api_url;
  constructor(private iab: InAppBrowser ,public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    this.ads_data = navParams.get('data');
  }

  ionViewDidLoad() {

  }
  inAppBro() {
    if (this.ads_data.web_url) {
      var url = this.ads_data.web_url ? this.ads_data.web_url : '';
      if (url.indexOf('http') == -1) {
        url = "http://" + url;
      }

      let browser = this.iab.create(url, '_blank', 'location=no');
      browser.on('loadstart').subscribe(event => {
        console.log("loadstart -->", event);
      }, err => {
        // this.base.showToast("Please make sure that your device is connected to a network!");
        // this.base.showSpinner(!1);

      });
    }

  }
 }
