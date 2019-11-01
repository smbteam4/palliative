import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the TermsOfUsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms-of-use',
  templateUrl: 'terms-of-use.html',
})
export class TermsOfUsePage {
  public termsData:any;
  public loggedIn:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ApiProvider:ApiProvider) {
    this.loggedIn = (JSON.parse(localStorage.getItem('loggedIn')) == 'true')? true: false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsOfUsePage');
    if(this.loggedIn)
      this.getPrivacyTerms(true);
    else  
      this.getPrivacyTerms(false)
  }

  getPrivacyTerms(logChck) {
    this.ApiProvider.showLoader();
    let data = {
      url:'terms'
    }
    if(logChck) {
      this.ApiProvider.common_get('getCmsdetails',data).subscribe((result)=>{
        if(result.status)
          this.termsData = result.body.data;
        else 
          this.ApiProvider.showLongToast(result.body.message);
          this.ApiProvider.hideLoader();
      })
    } else {
      this.ApiProvider.common_get_without_token('getCmsdetails',data).subscribe((result)=>{
        if(result.status)
          this.termsData = result.body.data;
        else 
          this.ApiProvider.showLongToast(result.body.message);
          this.ApiProvider.hideLoader();
      })
    }
   
  }
}
