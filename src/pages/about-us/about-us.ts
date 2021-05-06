import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,Navbar } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import {HomePage} from '../home/home'

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
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams,public ApiProvider:ApiProvider,public menu:MenuController) {
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
    this.getAboutUs();
  }
  ionViewDidEnter(){
    this.navBar.backButtonClick = () => {
      this.navCtrl.setRoot(HomePage);
      ///here you can do wathever you want to replace the backbutton event
    };
  }

  getAboutUs() {
    let data = {
      url:'about'
    }
    this.ApiProvider.common_post_withToken('getCmsdetails',data).subscribe((result)=>{
      if(result.status)
        this.aboutUsData = result.body.data;
      else 
        this.ApiProvider.showLongToast(result.body.message);
    })
  }

}
