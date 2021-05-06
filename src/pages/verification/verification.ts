import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, MenuController} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
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
    @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider,public menu :MenuController) {
    this.email = navParams.get('email');
    console.log(this.email,'emailll');
    menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
  }
  ionViewDidEnter(){
    this.navBar.backButtonClick = () => {
      this.navCtrl.setRoot(LoginPage);
      ///here you can do wathever you want to replace the backbutton event
    };
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
          // this.apiProvider.showLongToast(result.body.message);
          localStorage.setItem('user',JSON.stringify(result.body.user));
          localStorage.setItem('loggedIn','true');
          localStorage.setItem('x-access-token',JSON.stringify(result.body.userToken));
          this.navCtrl.setRoot(HomePage);
          // this.apiProvider.showLongToast(result.body.message);
        } else {
          // this.apiProvider.showLongToast(result.body.message);
        }
        
      })
    } else {
          this.apiProvider.showLongToast('Please enter the verification code')
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
      this.apiProvider.showLoader();
      this.apiProvider.common_post('resend_reg_code',data).subscribe((result)=>{
        // console.log(result.body, 'result.bodyresult.bodyresult.body')
        if(result.body.status == true){
          this.apiProvider.showLongToast(result.body.message);
        }
        this.apiProvider.hideLoader();
        
        // if(result.body.status == true){
        //   localStorage.setItem('user',result.body.user);
        //   localStorage.setItem('loggedIn','true');
        //   this.navCtrl.setRoot(HomePage);
        // }
       
      })
    // } else {

    // }
  }


  setFocus(event,el) {
    // console.log(event)
    // if(event.target.value.length >1) {
    //   event.target.value = event.target.value.substring(0,event.target.value.length-1);
    //   event.preventDefault();
    //   el.setFocus();
    // }else {
      
      if (event.keyCode == 8)
      return false;
    else if(event.target.value.length)
      el.focus();
    // }
    // document.getElementById('itemtest').focus();
    // event.setFocus();
    // console.log(event.keyCode)
    // let element = event.srcElement.nextElementSibling;
   
  }

  backHandle(event,el) {
    // event.focus();
    // let element = event.srcElement.previousElementSibling;
    // if (element == null)
    //   return;
    // else
    //   element.focus();
    // if(event.target.value.length >1) {
    //   event.target.value = event.target.value.substring(0,event.target.value.length-1);
    //   event.preventDefault();
    // }else {
      // console.log(event.target.value.length,'dfjdjfkdfk');
        // if (event.keyCode == 8  && event.target.value.length == 0)
        if(!event.target.value.length)
          el.focus();
      // else {
      //   el.setFocus();
      // }
         
    // }
  
  }
  setInput(event) {
    if(event.target.value.length >1) {
      event.target.value = event.target.value.substring(0,event.target.value.length-1);
    }
  }
}
