import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
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
  public category:any;
  public category_name:any;
  public topic_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionPage');
    this.getDescription()
  }
  getDescription(){
    // let data = {
    //   // category:this.category,
    //   topic_id:this.topic_id
    // }
    // this.apiProvider.common_get('getDescription',data).subscribe((result)=>{
    //   if(result.body.status == true) {
    //     // this.topicList = result.body.categories;
    //   }
    // })
  }

}
