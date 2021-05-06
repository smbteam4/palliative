import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Toast } from '@ionic-native/toast';
import { VerificationPage } from '../verification/verification';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../providers/validators/validators'
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TermsOfUsePage } from '../terms-of-use/terms-of-use'

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signUpForm: FormGroup;
  user:any={};
  isInvalid = false;
  rootPage:any;
  message = "";
  submitAttempted: boolean;
  acceptPrivacy:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider, private toast: Toast, fb: FormBuilder,public menu:MenuController) {
    this.rootPage = ''
    this.signUpForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required],
      agree: [false, Validators.required]
    });
    this.acceptPrivacy = false;
    this.menu.swipeEnable(false);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SignupPage');
    this.user ={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  signUpNow(){
    this.submitAttempted = true;
    // this.isInvalid = this.checkFormNow();
    // console.log(this.isInvalid, 'this.isInvalid');
    // console.log('here in signup')
    this.acceptPrivacy = false;
    if(this.signUpForm.valid) {
    
      // if(this.signUpForm.value.agree) {
        this.apiProvider.showLoader();
        let data = {
          first_name:this.signUpForm.value.first_name,
          last_name:this.signUpForm.value.last_name,
          email:this.signUpForm.value.email,
          password:this.signUpForm.value.password
        }
        this.apiProvider.common_post('register',data).subscribe((result)=>{
          if(result.body.status == true){
            this.navCtrl.push(VerificationPage,{
              email:data.email
            });
            this.apiProvider.hideLoader();
            this.submitAttempted = false;
          } else {
            //this.apiProvider.showLongToast(result.body.message);
            this.apiProvider.hideLoader();
          }
         
        })
      // } else {
      //   this.acceptPrivacy = true;
      // }
      
    }

   
  }

  checkFormNow(){
    let allset = false;
    for(let item in this.user){
      // console.log(this.user[item], 'itemmmm here',item);
      if(!this.user[item]){
         switch(item){
           case 'first_name':
             this.message = "First name cannot be blank";
            break;
            case 'last_name':
             this.message = "Last name cannot be blank";
            break;
            case 'email':
             this.message = "Email cannot be blank";
            break;
            case 'password':
                this.message = "Password cannot be blank";
               break;
         }
        allset = true;
      }
    }
    // console.log(allset,'validation value');
    return allset;
  }

  goToTerms(){
    this.navCtrl.push(TermsOfUsePage)
  }
  goToPrivacy() {
    this.navCtrl.push(PrivacyPolicyPage)
  }

}
