import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'

/**
 * Generated class for the PaymentsccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentsccess',
  templateUrl: 'paymentsccess.html',
})
export class PaymentsccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsccessPage');
  }

  goToHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
