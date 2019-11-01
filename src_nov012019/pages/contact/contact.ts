import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  public contactMsg:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public ApiProvider:ApiProvider) {
    this.contactMsg ='';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  saveContact(){
    let data = {
      msg:this.contactMsg
    }
    if(this.contactMsg){
      this.ApiProvider.showLoader();
      this.ApiProvider.common_post_withToken('contact',data).subscribe((result)=>{
        if(result.status){
          this.contactMsg = "";
          
          this.ApiProvider.showLongToast(result.body.message);
        } else {
          this.ApiProvider.showLongToast(result.body.message);
        }
        this.ApiProvider.hideLoader();
      })
    } else {
      this.ApiProvider.showLongToast('Please enter some message');
    }
  }

}
