import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api'
import {HomePage} from '../home/home'
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
  @ViewChild('navbar') navBar: Navbar;
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
  ionViewDidEnter(){
    this.navBar.backButtonClick = () => {
      this.navCtrl.setRoot(HomePage);
      ///here you can do wathever you want to replace the backbutton event
    };
  }

  getPrivacyPolicy(logChck) {
    this.ApiProvider.showLoader();
    let data = {
      url:'privacy'
    }
    if(!logChck) {
      this.ApiProvider.common_post_withToken('getCmsdetails',data).subscribe((result)=>{
        if(result.status)
          this.privacyData = result.body.data;
        else 
          this.ApiProvider.showLongToast(result.body.message);
          this.ApiProvider.hideLoader();
      })
    } else {
      this.ApiProvider.common_post('getCmsdetails',data).subscribe((result)=>{
        if(result.status)
          this.privacyData = result.body.data;
        else 
          this.ApiProvider.showLongToast(result.body.message);
          this.ApiProvider.hideLoader();
      })
    }
    
  }
  

}
