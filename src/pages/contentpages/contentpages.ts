import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the ContentpagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contentpages',
  templateUrl: 'contentpages.html',
})
export class ContentpagesPage {
  public category:any;
  public category_name:any;
  public topic_id:any;
  public title:any;
  public descriptionData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public apiProvider:ApiProvider) {
    this.category = navParams.get('category_id');
    this.topic_id = navParams.get('topic_id');
    this.title = navParams.get('title')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContentpagesPage');
    this.getContentPage()
  }

  getContentPage(){
    let data = {
      // category:this.category,
      topic_id:this.topic_id
    }
    this.apiProvider.common_get('getDescription',data).subscribe((result)=>{
      if(result.body.status == true) {
        
        this.descriptionData = result.body.description;
        // this.topicList = result.body.categories;
      }
    })
  }

}
