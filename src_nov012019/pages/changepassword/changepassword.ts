import { Component, ViewChild } from '@angular/core';
import {Nav, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {
  @ViewChild(Nav) nav: Nav;
  changePasswordForm: FormGroup;
  rootPage: any = HomePage;
  submitAttempted:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, public ApiProvider:ApiProvider) {
    this.submitAttempted = false;
    this.changePasswordForm = fb.group({
      cur_password: ['', Validators.required],
      new_password: ['', Validators.required],
      confirm_password: ['',Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
  }
  goBack() {
    this.navCtrl.pop();
  }
  popView(){
    this.navCtrl.pop();
  }
  changePassword(){
    this.submitAttempted = true;
    // debugger;
    let data = {
      oldpassword:this.changePasswordForm.value.cur_password,
      newPassword:this.changePasswordForm.value.new_password
    }
    if(this.changePasswordForm.valid) {
      this.ApiProvider.showLoader();
      if(this.changePasswordForm.value.confirm_password == this.changePasswordForm.value.new_password){
        this.ApiProvider.common_post_withToken('changePassword',data).subscribe((result)=>{
          if(result.body.status){
            this.ApiProvider.hideLoader();
            this.ApiProvider.showLongToast(result.body.message);
            this.submitAttempted= false;
            this.navCtrl.setRoot(HomePage);
          } else {
            this.ApiProvider.hideLoader();
            this.ApiProvider.showLongToast(result.body.message);
          }
        })
      } else {
        this.ApiProvider.hideLoader();
        this.ApiProvider.showLongToast('Password missmatch');
      }
    }
   
   
  }
}
