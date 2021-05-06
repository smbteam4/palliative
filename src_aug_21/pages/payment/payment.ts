import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { StripeProvider } from '../../providers/stripe/stripe';
import { PaymentsccessPage } from '../paymentsccess/paymentsccess';
import { ApiProvider } from '../../providers/api/api' 
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
  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder,public StripeProvider:StripeProvider, public ApiProvider:ApiProvider) {
    this.submitAttempted = false;
    this.paymentForm = fb.group({
      name: ['', Validators.required],
      card_number: ['', Validators.compose([Validators.required,Validators.maxLength(16)])],
        cvv:['', Validators.compose([Validators.required,Validators.maxLength(3)])],
        expdate: ['', Validators.required],
       
        // age: ['value', *validation function goes here*, *asynchronous validation function goes here*]
    });
  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }

  payNow() {
    this.submitAttempted = true;
    console.log(this.paymentForm.value,'valueeeeeeeeeeeee');
    this.StripeProvider.createToken(this.paymentForm.value).then((result)=>{
      this.ApiProvider.common_post_withToken('charge',result).subscribe((result2)=>{
        if(result2.status){
          this.navCtrl.push(PaymentsccessPage);
        } else {
          this.ApiProvider.showLongToast(result2.body.message);
        }
        // console.log(result,'resultttttttttttttt')
      })
    })
    
  }

}
