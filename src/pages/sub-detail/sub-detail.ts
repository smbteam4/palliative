import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ContentpagesPage } from '../contentpages/contentpages';
import { AdsDetailPage } from '../ads-detail/ads-detail';
import { GalleryPage } from '../gallery/gallery'
import { AppSettings } from '../../app/app.settings';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
/**
 * Generated class for the SubDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-detail',
  templateUrl: 'sub-detail.html',
})
export class SubDetailPage {
  public category: any;
  public category_name: any;
  public subjectList: any = [];
  public sub_cat_name: any;
  public topic_id: any;
  public add_details: any = {
    title: ''
  };
  public baseUrl = AppSettings.api_url;
  constructor(private platform: Platform, private admobFree: AdMobFree, private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
    this.category = navParams.get('category_id');
    // this.category_name = navParams.get('category_name');
    this.topic_id = navParams.get('topic_id')
    this.sub_cat_name = navParams.get('sub_cat_title');
    this.subjectList = [{ id: 1, title: 'Description' }, { id: 2, title: 'Images' }, { id: 3, title: 'Treatment Options' }]
    this.getAds();

  }

  ionViewDidLoad() {

  }
  ionViewWillLeave() {
    this.admobFree.banner.remove()
  }
  getAds() {
    this.apiProvider.common_post_withToken('getads', { topic_id: this.topic_id }).subscribe((result) => {
      console.log(result)
      if (result.body.ads && result.body.ads.length) {
        this.add_details = result.body.ads && result.body.ads.length ? result.body.ads[0] : [];
      } else {
        let adId;
        if (this.platform.is('android')) {
          adId = 'ca-app-pub-9848755388062117/3242149007';
        } else if (this.platform.is('ios')) {
          adId = 'ca-app-pub-9848755388062117/7274066818';
        }
        const bannerConfig: AdMobFreeBannerConfig = {
         
          isTesting: false,
          autoShow: true,
          id: adId
        };
        this.admobFree.banner.config(bannerConfig);

        this.admobFree.banner.prepare()
          .then(() => {
            
          })
          .catch(e => console.log(e));
     
      }

    })
  }

  goToSubDetails(title) {
    switch (title) {
      case 'Description':
        this.navCtrl.push(ContentpagesPage, { category_id: this.category, topic_id: this.topic_id, title: title });
        break;
      case 'Images':
        this.navCtrl.push(GalleryPage, { category_id: this.category, topic_id: this.topic_id, title: title });
        break;
      case 'Treatment Options':
        this.navCtrl.push(ContentpagesPage, { category_id: this.category, topic_id: this.topic_id, title: title });
        break;
    }

  }

  presentProfileModal() {



    if (this.add_details && this.add_details.is_web_url && this.add_details.is_web_url == 'Y' && this.add_details.web_url) {
      var url = this.add_details.web_url;
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
    } else {
      this.navCtrl.push(AdsDetailPage, { data: this.add_details });
    }




  }

}
