import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder,  public apiProvider:ApiProvider) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password: ['', Validators.required],
        // age: ['value', *validation function goes here*, *asynchronous validation function goes here*]
    });

    this.isLoggedIn = (localStorage.getItem('loggedIn') == 'true')? true:false;
    // this.loginForm = fb.group({
    //   email: fb.control('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    //   password: ['', Validators.required]
    // })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad VerificationPage');
    this.setCurPage();
  }

  login(){
    this.submitAttempted = true;
    // console.log(this.loginForm.value,'test 123456')
    this.apiProvider.showLoader();
    let data = this.loginForm.value;
    this.apiProvider.common_post('authenticate',data).subscribe((result)=>{
      if(result.body.status == true) {
        this.apiProvider.hideLoader();
        this.apiProvider.showLongToast(result.body.message);
        this.navCtrl.setRoot(HomePage);
        localStorage.setItem('user',JSON.stringify(result.body.user));
        localStorage.setItem('loggedIn','true');
        localStorage.setItem('x-access-token',JSON.stringify(result.body.userToken))
      } else {
        this.apiProvider.hideLoader();
        this.apiProvider.showLongToast(result.body.message);
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
