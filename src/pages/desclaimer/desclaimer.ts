import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the DesclaimerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-desclaimer',
  templateUrl: 'desclaimer.html',
})
export class DesclaimerPage {
  public desclaimerData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ApiProvider:ApiProvider, public menu:MenuController) {
    this.getDesclaimer();
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DesclaimerPage');
  }

  getDesclaimer() {
    this.ApiProvider.showLoader();
    let data = {
      url:'disclaimer'
    }
    this.ApiProvider.common_post_withToken('getCmsdetails',data).subscribe((result)=>{
      if(result.status)
        this.desclaimerData = result.body.data;
      else 
        this.ApiProvider.showLongToast(result.body.message);
        this.ApiProvider.hideLoader();
    });

  }
}
