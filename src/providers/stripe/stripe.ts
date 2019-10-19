import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../../app/app.settings';
import { Stripe } from '@ionic-native/stripe';
import { ApiProvider } from '../api/api'
/*
  Generated class for the StripeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StripeProvider {
  public cur_stripe:any;
  constructor(public http: HttpClient, private stripe: Stripe, public ApiProvider:ApiProvider) {
    // console.log('Hello StripeProvider Provider');
    this.stripe.setPublishableKey(AppSettings.stripe_key);
  }

//  public createToken(card) {
//     console.log(card)
//     let card_token = {
//       number: card.card_number,
//       expMonth: parseInt(card.expdate.split('-')[1]),
//       expYear:  parseInt(card.expdate.split('-')[0]),
//       cvc:  card.cvv
//     }

//     return new Promise((resolve, reject) =>{
//       this.stripe.createCardToken(card_token)
//         .then((token)=> {
//           // console.log(token.card,'ddfdfffffffffffffffff');
//           let data = {
//             stripeToken:token.id
//           }
//           this.ApiProvider.common_post_withToken('charge',data).subscribe((result)=>{
//             // console.log(result,'resultttttttttttttt')
//           })
//         }).catch((error) => {
//           // console.error(error)
//           // console.log('hereeeeeeeeee',error);
//         });
//     }
//     // console.log(card_token);
    
//   }


  public createToken(card) {
    console.log(card)
    let card_token = {
      number: card.card_number,
      expMonth: parseInt(card.expdate.split('-')[1]),
      expYear:  parseInt(card.expdate.split('-')[0]),
      cvc:  card.cvv
    }

    return new Promise((resolve, reject) => {
      this.stripe.createCardToken(card_token)
      .then((token)=> {
        // console.log(token.card,'ddfdfffffffffffffffff');
        let data = {
          stripeToken:token.id
        }
        resolve(data);
        // this.ApiProvider.common_post_withToken('charge',data).subscribe((result)=>{
        //   if(result.status){
        //     resolve()
        //   }
        //   // console.log(result,'resultttttttttttttt')
        // })
      }).catch((error) => {
        reject(error);
        // console.error(error)
        // console.log('hereeeeeeeeee',error);
      });
      
    });

  }

}
