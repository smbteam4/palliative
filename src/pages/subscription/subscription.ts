import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController,Navbar } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { PaymentPage } from '../payment/payment';
import {HomePage} from '../home/home'

// import { ContentpagesPage } from '../contentpages/contentpages';

/**
 * Generated class for the SubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.html',
})
export class SubscriptionPage {
  @ViewChild('navbar') navBar: Navbar;
  public category:any;
  public category_name:any;
  public topic_id:any;
  public subscriptionDetails:any={};
  public userDetaills:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider, public menu:MenuController) {
    this.menu.swipeEnable(false);
  }
  ionViewDidEnter(){
    this.navBar.backButtonClick = () => {
      this.navCtrl.setRoot(HomePage);
      ///here you can do wathever you want to replace the backbutton event
    };
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SubscriptionPage');
    this.getDescription();
  }
  getDescription(){
    this.apiProvider.showLoader();
    this.apiProvider.common_get('getSubscription',{}).subscribe((result)=>{
      // if(result.body.status == true) {
        this.subscriptionDetails =result.body;
        // console.log(this.subscriptionDetails)
        // this.topicList = result.body.categories;
      // }
      this.apiProvider.hideLoader();
    })
  }

  goTopayment(){
    this.navCtrl.push(PaymentPage)
  }

}
