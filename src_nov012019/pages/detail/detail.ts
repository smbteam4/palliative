import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { SubDetailPage } from '../sub-detail/sub-detail';
import { SubscriptionPage } from '../subscription/subscription';
import { AppSettings } from '../../app/app.settings'
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public topicList:any=[];
  public category:any;
  public basicUrl = AppSettings.api_url;
  public category_name:any;
  public usrDetails :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider) {

    this.category = navParams.get('category_id');
    this.category_name = navParams.get('category_name');
    this.usrDetails = JSON.parse(localStorage.getItem('user'));
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad DetailPage');
    this.getTopicList();
  }

  getTopicList(){
    let data = {
      category:this.category
    }
    this.apiProvider.showLoader();
    this.apiProvider.common_get('getTopicLists',data).subscribe((result)=>{
      if(result.body.status == true) {
        this.topicList = result.body.categories;
      }
      this.apiProvider.hideLoader();
    })
  }
  /**
   * 
   * @param title => title of the category
   * @param topic_id => current topic id
   */
  gotoSubDetails(title,topic_id) {
    if(this.usrDetails.subscription == "TRUE") {
      this.navCtrl.push(SubDetailPage,{category_id:this.category,sub_cat_title:title,topic_id:topic_id});
    } else {
      this.apiProvider.presentConfirm('Please subscribe to view the details','Palliative').then((result)=>{
        this.navCtrl.push(SubscriptionPage);
      }).catch((error)=>{
        
      })
    }
    
  }

  

}
