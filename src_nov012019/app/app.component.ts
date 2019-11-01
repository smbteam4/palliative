import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
// import { SignupPage } from '../pages/signup/signup';
// import { VerificationPage } from '../pages/verification/verification';
// import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { ProfilePage } from '../pages/profile/profile';
import { ContactPage } from '../pages/contact/contact';
// import { PaymentPage } from '../pages/payment/payment';
// import { PaymentsccessPage } from '../pages/paymentsccess/paymentsccess';
import { SubscriptionPage } from '../pages/subscription/subscription';
// import { GalleryPage } from '../pages/gallery/gallery';
// import { ContentpagesPage } from '../pages/contentpages/contentpages';
import { AboutUsPage } from '../pages/about-us/about-us';
import { TermsOfUsePage } from '../pages/terms-of-use/terms-of-use';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { DesclaimerPage } from '../pages/desclaimer/desclaimer';
import { ApiProvider } from '../providers/api/api'
// import { DetailPage } from '../pages/detail/detail';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  isLoggedIn:any;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public ApiProvider:ApiProvider) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      // { title: 'Sign Up', component: SignupPage },
      { title: 'My Profile', component: ProfilePage },
     { title: 'My Subscription', component: SubscriptionPage },
      { title: 'Change Password', component: ChangepasswordPage },
      { title: 'About Us', component: AboutUsPage },
      { title: 'Terms of Use', component: TermsOfUsePage },
      { title: 'Privacy Policy', component: PrivacyPolicyPage },
      // { title: 'Disclaimer', component: DesclaimerPage },
      { title: 'Contact Us', component: ContactPage },
      { title: 'Logout', component: LoginPage },
    ];
   
    console.log(localStorage.getItem('loggedIn'),'loggedin')
    this.isLoggedIn = (localStorage.getItem('loggedIn') == 'true')? true:false;

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(()=>{
        this.splashScreen.hide();
      },1000)
      
    });

    // console.log(this.isLoggedIn,'this.isLoggedIn');
    // this.isLoggedIn = (localStorage.getItem('loggedIn') == 'true')? true:false;
    
  }

  
  

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
  // console.log('here in home... 12434',page.title)
    if(page.title == 'Home'){
      // console.log('here in home... 12434')
      this.nav.setRoot(page.component);
    } else if(page.title == 'Logout'){
      this.logout();
    }else {
      this.nav.push(page.component);
    }
   
  }

  

  logout(){
    // console.log('hereeeee');
    this.ApiProvider.presentConfirm('Are you sure you want to logout?','Palliative').then((result)=>{
      localStorage.clear();
      localStorage.removeItem('user');
      localStorage.removeItem('loggedIn');
      this.nav.setRoot(LoginPage);
    }).catch((err)=>{
      console.log(err);
    })
   
    
  }
}
