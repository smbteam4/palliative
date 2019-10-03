import { Component,ViewChild } from '@angular/core';
import { Nav, Platform,NavController } from 'ionic-angular';
import { ChangepasswordPage } from '../changepassword/changepassword';
import { ProfilePage } from '../profile/profile';
import { ContactPage } from '../contact/contact';
import { ContentpagesPage } from '../contentpages/contentpages';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
// import { SubscriptionPage } from '../Subscription/subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;

 // rootPage: any = LoginPage;
 pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Sign Up', component: SignupPage },
      { title: 'My Profile', component: ProfilePage },
      // { title: 'My Subscription', component: SubscriptionPage },
      { title: 'Change Password', component: ChangepasswordPage },
      { title: 'About Us', component: ContentpagesPage },
      // { title: 'Terms of Use', component: VerificationPage },
      // { title: 'Privacy Policy', component: ForgotpasswordPage },
      { title: 'Disclamer', component: ChangepasswordPage },
      { title: 'Contact Us', component: ContactPage },
      { title: 'Logout', component: LoginPage },
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
