import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ForgotpasswordPage } from '../forgotpassword/forgotpassword';
// import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { Toast } from '@ionic-native/toast';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder,  public apiProvider:ApiProvider, private toast: Toast) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.required],
      // age: ['value', *validation function goes here*, *asynchronous validation function goes here*]
  });
    // this.loginForm = fb.group({
    //   email: fb.control('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
    //   password: ['', Validators.required]
    // })
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.submitAttempted = true;
    console.log(this.loginForm.value,'credentialsss')
    // alert('haiiiiii');
    // this.navCtrl.setRoot(HomePage);
  }

  forgotPassword(){
    // alert('haiiiiii');
    this.navCtrl.push(ForgotpasswordPage);
  }


  signupNow(){
    // alert('haiiiiii');
    this.navCtrl.push(SignupPage);
  }
   
}
