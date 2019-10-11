import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LoginPage } from '../login/login'

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  forgotForm: FormGroup;
  submitAttempted: boolean = false;
  codeSuccess:boolean = false;
  user:any;
  public otp0;
  public otp1;
  public otp2;
  public otp3;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public apiProvider:ApiProvider,  fb: FormBuilder) {
    this.forgotForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
    });

  }

  ionViewDidLoad() {
    this.user = {
      password:'',
      confirmPassword:''
    }
  }
  sendCode() {
    // this.apiProvider.showLoader();
    let data = {
      email:this.forgotForm.value.email
    }
    setTimeout(()=>{
      this.apiProvider.common_post('forgotPassword',data).subscribe((result)=>{
        if(result.body.status == true) {
          this.codeSuccess = true;
  
          // this.navCtrl.setRoot(HomePage);
          // this.navCtrl.setRoot(VerificationPage,{
          //   email:this.forgotForm.value.email
          // });
        } else {
          
        }
      })
    },1000)
    
  }

  setPassword(){
    if(this.otp0  && this.otp1 && this.otp2 && this.otp3) {
      if(!this.user.password  || !this.user.confirmPassword){
        alert('password required');
        return;
      }
      if(this.user.password == this.user.confirmPassword){
        let data = {
          otp:this.otp0 + this.otp1 + this.otp2 +this.otp3,
          email:this.forgotForm.value.email,
          password:this.user.password,
          confirmPwd:this.user.confirmPassword
        }
        this.apiProvider.common_post('setPassword',data).subscribe((result)=>{
          if(result.body.status == true) {
            // this.codeSuccess = true;
            this.navCtrl.setRoot(LoginPage);
            
          } else {
            
          }
        })
      } else {
        alert('password mismatch');
        return;
      }
    }else {
      alert('invalid otp');
      return;
    }
  }


  changeNum(eve){

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
