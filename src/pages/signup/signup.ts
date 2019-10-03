import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Toast } from '@ionic-native/toast';

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
  user:any={};
  isInvalid = false;
  message = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider:ApiProvider, private toast: Toast) {
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
    this.isInvalid = this.checkFormNow();
    // console.log(this.isInvalid, 'this.isInvalid');
    if(!this.isInvalid) {
      this.apiProvider._post('users/register',this.user).subscribe((result)=>{
        // console.log('here on register')
      })
    } else {
      // console.log('here no entry')
      // this.message = ''
      alert(this.message)
      // this.toast.show(this.message, '500000', 'center').subscribe();
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

}
