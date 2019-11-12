import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { StripeProvider } from '../../providers/stripe/stripe';
import { PaymentsccessPage } from '../paymentsccess/paymentsccess';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  paymentForm: FormGroup;
  submitAttempted:boolean;
  userDetails:any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder,public StripeProvider:StripeProvider, public ApiProvider:ApiProvider, public menu :MenuController) {
    this.userDetails = JSON.parse(localStorage.getItem('user'));
    this.menu.swipeEnable(false);
    this.submitAttempted = false;
    this.paymentForm = fb.group({
      name: ['', Validators.required],
      card_number: ['', Validators.compose([Validators.required,Validators.minLength(16),Validators.maxLength(16),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
        cvv:['', Validators.compose([Validators.required,Validators.maxLength(4),Validators.minLength(3),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
        expdate: ['', Validators.required],
       
        // age: ['value', *validation function goes here*, *asynchronous validation function goes here*]
    });
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  payNow() {
    this.submitAttempted = true;
    // console.log(this.paymentForm.value,'valueeeeeeeeeeeee');
    this.ApiProvider.showLoader();
    this.StripeProvider.createToken(this.paymentForm.value).then((result)=>{
      this.ApiProvider.common_post_withToken('charge',result).subscribe((result2)=>{
        if(result2.status){
          this.userDetails.subscription = "TRUE";
          localStorage.setItem('user',JSON.stringify(this.userDetails));
          this.navCtrl.push(PaymentsccessPage);
          
        } else {
          // this.ApiProvider.showLongToast(result2.body.message);
        }
        this.ApiProvider.hideLoader();
        // console.log(result,'resultttttttttttttt')
      })
    },(error)=>{
      this.ApiProvider.showLongToast(error);
      this.ApiProvider.hideLoader();
    })
    
  }

}
