import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api'

/**
 * Generated class for the PrivacyPolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {
  public privacyData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ApiProvider:ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPolicyPage');
    this.getPrivacyPolicy();
  }

  getPrivacyPolicy() {
    let data = {
      url:'privacy'
    }
    this.ApiProvider.common_get('getCmsdetails',data).subscribe((result)=>{
      if(result.status)
        this.privacyData = result.body.data;
      else 
        this.ApiProvider.showLongToast(result.body.message);
    })
  }
  

}
