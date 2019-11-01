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
  public loggedIn:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ApiProvider:ApiProvider) {
    this.loggedIn = (JSON.parse(localStorage.getItem('loggedIn')) == 'true')? true: false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPolicyPage');
    if(this.loggedIn)
      this.getPrivacyPolicy(false);
    else
      this.getPrivacyPolicy(true);
  }

  getPrivacyPolicy(logChck) {
    this.ApiProvider.showLoader();
    let data = {
      url:'privacy'
    }
    if(!logChck) {
      this.ApiProvider.common_get('getCmsdetails',data).subscribe((result)=>{
        if(result.status)
          this.privacyData = result.body.data;
        else 
          this.ApiProvider.showLongToast(result.body.message);
          this.ApiProvider.hideLoader();
      })
    } else {
      this.ApiProvider.common_get_without_token('getCmsdetails',data).subscribe((result)=>{
        if(result.status)
          this.privacyData = result.body.data;
        else 
          this.ApiProvider.showLongToast(result.body.message);
          this.ApiProvider.hideLoader();
      })
    }
    
  }
  

}
