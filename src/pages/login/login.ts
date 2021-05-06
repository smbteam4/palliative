import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
import { VerificationPage } from '../verification/verification';

// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
// import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  submitAttempted: boolean = false;
  isLoggedIn:any;
  showHide:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder,  public apiProvider:ApiProvider, public menu :MenuController) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password: ['', Validators.required],
        // age: ['value', *validation function goes here*, *asynchronous validation function goes here*]
    });

    this.isLoggedIn = (localStorage.getItem('loggedIn') == 'true')? true:false;
    this.showHide = (localStorage.getItem('live_status') == 'false')?false:true;
    console.log(this.showHide,'testtttttttttt');
    this.menu.swipeEnable(false);
    // this.loginForm = fb.group({
    //   email: fb.control('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    //   password: ['', Validators.required]
    // })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad VerificationPage');
    this.apiProvider.common_post_withToken('live_status',{}).subscribe((result)=>{
      if(result.body.status) {
        localStorage.setItem('live_status',result.body.live_status);
        this.showHide = result.body.live_status;
        // this.setCurPage();
      }
      // console.log('here',result);
    },(error)=>{
      console.log('here',error);
      // this.setCurPage();
      localStorage.setItem('live_status','true');
      this.showHide= false;
    })
  }

  login(){
    this.submitAttempted = true;
    // console.log(this.loginForm.value,'test 123456')
    this.apiProvider.showLoader();
    let data = this.loginForm.value;
    this.apiProvider.common_post('authenticate',data).subscribe((result)=>{
      if(result.body.status == true) {
        this.apiProvider.hideLoader();
        // this.apiProvider.showLongToast(result.body.message);
        this.navCtrl.setRoot(HomePage);
        localStorage.setItem('user',JSON.stringify(result.body.user));
        localStorage.setItem('loggedIn','true');
        localStorage.setItem('x-access-token',JSON.stringify(result.body.userToken))
      } else if(result.body.type == 'inactive'){
        // this.apiProvider.showLongToast(result.body.message);
        let data = {
          email:this.loginForm.value.email
        }
        this.apiProvider.common_post('resend_reg_code',data).subscribe((result)=>{
          if(result.body.status == true){
            this.navCtrl.push(VerificationPage,{
              email:data.email
            });
          }
        })
        this.apiProvider.hideLoader();
        
      } else {
        // this.apiProvider.showLongToast(result.body.message);
        this.apiProvider.hideLoader();
      }
    })
  }

  forgotPassword(){
    // alert('haiiiiii');
    this.navCtrl.push(ForgotpasswordPage);
  }


  signupNow(){
    // alert('haiiiiii');
    this.navCtrl.push(SignupPage);
  }

  setCurPage(){
    if(this.isLoggedIn) {
      // console.log('heereeeeeeee')
      this.navCtrl.setRoot(HomePage);
    }
  }

  
   
}
