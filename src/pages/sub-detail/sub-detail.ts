import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ContentpagesPage } from '../contentpages/contentpages';
import { GalleryPage } from '../gallery/gallery'


/**
 * Generated class for the SubDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-detail',
  templateUrl: 'sub-detail.html',
})
export class SubDetailPage {
  public category:any;
  public category_name:any;
  public subjectList:any=[];
  public sub_cat_name:any;
  public topic_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider) {
    this.category = navParams.get('category_id');
    // this.category_name = navParams.get('category_name');
    this.topic_id = navParams.get('topic_id')
    this.sub_cat_name = navParams.get('sub_cat_title');
    this.subjectList = [{id:1, title : 'Description'}, {id:2, title : 'Images'}, {id:3, title : 'Treatment Options'}]
  }

  ionViewDidLoad() {
   
  }

  goToSubDetails(title) {
    switch(title) {
      case 'Description':
          this.navCtrl.push(ContentpagesPage,{category_id:this.category,topic_id:this.topic_id,title:title});
      break;
      case 'Images':
          this.navCtrl.push(GalleryPage,{category_id:this.category,topic_id:this.topic_id,title:title});
      break;
      case 'Treatment Options':
          this.navCtrl.push(ContentpagesPage,{category_id:this.category,topic_id:this.topic_id,title:title});
      break;
    }
    
  }

}
