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
  constructor(public navCtrl: NavController, public navParams: NavParams, public ApiProvider:ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsOfUsePage');
    this.getPrivacyTerms();
  }

  getPrivacyTerms() {
    let data = {
      url:'terms'
    }
    this.ApiProvider.common_get('getCmsdetails',data).subscribe((result)=>{
      if(result.status)
        this.termsData = result.body.data;
      else 
        this.ApiProvider.showLongToast(result.body.message);
    })
  }
}
