import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Navbar, MenuController } from 'ionic-angular';
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
  @ViewChild('navbar') navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu:MenuController) {
    this.menu.swipeEnable(false);
  }
  ionViewDidEnter(){
    this.navBar.backButtonClick = () => {
      this.navCtrl.setRoot(HomePage);
      ///here you can do wathever you want to replace the backbutton event
    };
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsccessPage');
  }

  goToHome(){
   
  }

}
