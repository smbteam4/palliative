import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  public aboutUsData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public ApiProvider:ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
    this.getAboutUs();
  }

  getAboutUs() {
    let data = {
      url:'about'
    }
    this.ApiProvider.common_get('getCmsdetails',data).subscribe((result)=>{
      if(result.status)
        this.aboutUsData = result.body.data;
      else 
        this.ApiProvider.showLongToast(result.body.message);
    })
  }

}
