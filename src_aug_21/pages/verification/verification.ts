import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {
    public email;
    public otp0;
    public otp1;
    public otp2;
    public otp3;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider) {
    this.email = navParams.get('email');
    console.log(this.email,'emailll');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
  }

  changeNum(eve){

  }
  verifyCode(){
    if(this.otp0 && this.otp1 && this.otp2 && this.otp3){
      let otps = this.otp0+this.otp1+this.otp2+this.otp3;
      // console.log(otps,'otpssssss');
      let data = {
        email:this.email,
        otp:otps
      }
      this.apiProvider.common_post('verify_reg_code',data).subscribe((result)=>{
        if(result.body.status == true){
          this.apiProvider.showLongToast(result.body.message);
          localStorage.setItem('user',result.body.user);
          localStorage.setItem('loggedIn','true');
          this.navCtrl.setRoot(HomePage);
        } else {
          this.apiProvider.showLongToast(result.body.message);
        }
       
      })
    } else {
     
    }
    
  }

  resendCode(){
    // if(this.otp0 && this.otp1 && this.otp2 && this.otp3){
    //   let otps = this.otp0+this.otp1+this.otp2+this.otp3;
      // console.log(otps,'otpssssss');
      let data = {
        email:this.email,
        // otp:otps
      }
      this.apiProvider.common_post('forgotPassword',data).subscribe((result)=>{
        if(result.body.status == true){
          localStorage.setItem('user',result.body.user);
          localStorage.setItem('loggedIn','true');
          this.navCtrl.setRoot(HomePage);
        }
       
      })
    // } else {

    // }
  }


  setFocus(event) {
    console.log(event.keyCode)
    let element = event.srcElement.nextElementSibling;
    if (element == null || event.keyCode == 8)
      return false;
    else
      element.focus();
  }

  backHandle(event) {
    let element = event.srcElement.previousElementSibling;
    if (element == null)
      return;
    else
      element.focus();
  }
}
