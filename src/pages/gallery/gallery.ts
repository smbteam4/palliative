import { Component, ViewChild } from '@angular/core';
import { IonicPage, Navbar , NavController, NavParams, Events,MenuController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AppSettings } from '../../app/app.settings';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the GalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  @ViewChild(Navbar) navBar: Navbar;
  public category:any;
  public category_name:any;
  public topic_id:any;
  public title:any;
  public images:any = [];
  public baseUrl = AppSettings.api_url;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider, public events: Events,private photoViewer: PhotoViewer, public menu :MenuController) {

    this.category = navParams.get('category_id');
    this.topic_id = navParams.get('topic_id');
    this.title = navParams.get('title');
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=>{
      // todo something
      let data = {
        category : this.category,
        topic_id : this.topic_id,
        title : this.title
      }
      this.events.publish('subdetals', data);
      this.navCtrl.pop();
     }
    console.log('ionViewDidLoad GalleryPage');
    this.getGallery();
  }

  getGallery(){
    let data = {
      // category:this.category,
      topic_id:this.topic_id
    }
    this.apiProvider.showLoader();
    this.apiProvider.common_get('getTopicdetails',data).subscribe((result)=>{
      if(result.body.status == true) {
        this.images = result.body.data[0].images;
       
        // this.descriptionData = result.body.description;
        // this.treatment = result.body.treatment;
        // this.topicList = result.body.categories;
      }
      this.apiProvider.hideLoader();
    })
  }


  showImage(img){
    let url = this.baseUrl+ img;
    this.photoViewer.show(url);
  }

}
