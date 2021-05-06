import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar , NavController, NavParams, Events,MenuController ,Platform} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppSettings } from '../../app/app.settings';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { AdsDetailPage } from '../ads-detail/ads-detail';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  @ViewChild(Navbar) navBar: Navbar;
  public category:any;
  public category_name:any;
  public topic_id:any;
  public title:any;
  public images:any = [];
  public noImage:boolean;
  public baseUrl = AppSettings.api_url;
  public loading_img = "../../assets/images/sa.gif"
  public add_details: any = {
    title: ''
  };
  constructor(private iab: InAppBrowser,private platform: Platform,private admobFree: AdMobFree,public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider, public events: Events,private photoViewer: PhotoViewer, public menu :MenuController) {

    this.category = navParams.get('category_id');
    this.topic_id = navParams.get('topic_id');
    this.title = navParams.get('title');
    this.menu.swipeEnable(false);
    this.noImage = false;
    this.getAds();
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

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
      let data = {
        category : this.category,
        topic_id : this.topic_id,
        title : this.title
      }
      this.events.publish('subdetals', data);
      this.navCtrl.pop();
     }
    console.log('ionViewDidLoad GalleryPage');
    this.getGallery();
  }

  getGallery(){
    let data = {
      // category:this.category,
      topic_id:this.topic_id
    }
    this.apiProvider.showLoader();
    this.apiProvider.common_post_withToken('getTopicdetails',data).subscribe((result)=>{
      if(result.body.status == true) {
        this.images = result.body.data[0].images;
        this.noImage= true;
       
        // this.descriptionData = result.body.description;
        // this.treatment = result.body.treatment;
        // this.topicList = result.body.categories;
      }
      this.apiProvider.hideLoader();
    })
  }


  showImage(img){
    let url = this.baseUrl+ img;
    this.photoViewer.show(url);
  }

}
