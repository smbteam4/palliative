import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";

import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
// import { ListPage } from '../pages/list/list';
import { LoginPage } from "../pages/login/login";
// import { SignupPage } from '../pages/signup/signup';
// import { VerificationPage } from '../pages/verification/verification';
// import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { ChangepasswordPage } from "../pages/changepassword/changepassword";
import { ProfilePage } from "../pages/profile/profile";
import { ContactPage } from "../pages/contact/contact";
// import { PaymentPage } from '../pages/payment/payment';
// import { PaymentsccessPage } from '../pages/paymentsccess/paymentsccess';
import { SubscriptionPage } from "../pages/subscription/subscription";
// import { GalleryPage } from '../pages/gallery/gallery';
// import { ContentpagesPage } from '../pages/contentpages/contentpages';
import { AboutUsPage } from "../pages/about-us/about-us";
import { TermsOfUsePage } from "../pages/terms-of-use/terms-of-use";
import { PrivacyPolicyPage } from "../pages/privacy-policy/privacy-policy";
import { DesclaimerPage } from "../pages/desclaimer/desclaimer";
import { ApiProvider } from "../providers/api/api";
// import { DetailPage } from '../pages/detail/detail';

@Component({
  templateUrl: "app.html",
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  public showHide: any;

  pages: Array<{ title: string; component: any }>;
  isLoggedIn: any;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public ApiProvider: ApiProvider
  ) {
    this.initializeApp();

    this.pages = [
      { title: "Home", component: HomePage },
      // { title: 'Sign Up', component: SignupPage },
      { title: "My Profile", component: ProfilePage },
      { title: "My Subscription", component: SubscriptionPage },
      { title: "Change Password", component: ChangepasswordPage },
      { title: "About Us", component: AboutUsPage },
      { title: "Terms of Use", component: TermsOfUsePage },
      { title: "Privacy Policy", component: PrivacyPolicyPage },
      // { title: 'Disclaimer', component: DesclaimerPage },
      { title: "Contact Us", component: ContactPage },
      { title: "Delete Account", component: "" },
      { title: "Logout", component: LoginPage },
    ];

    console.log(localStorage.getItem("loggedIn"), "loggedin");
    this.isLoggedIn = localStorage.getItem("loggedIn") == "true" ? true : false;
  }

  ionViewDidLoad() {
    console.log("here meteterdfdfd");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
    });

    this.ApiProvider.common_post_withToken("live_status", {}).subscribe(
      (result) => {
        if (result.body.status) {
          localStorage.setItem("live_status", result.body.live_status);
          this.showHide = result.body.live_status;
          this.setCurPage();
        }
        // console.log('here',result);
      },
      (error) => {
        console.log("here", error);
        this.setCurPage();
        localStorage.setItem("live_status", "true");
        this.showHide = false;
      }
    );

    // console.log(this.isLoggedIn,'this.isLoggedIn');
    // this.isLoggedIn = (localStorage.getItem('loggedIn') == 'true')? true:false;
  }

  setCurPage() {
    if (this.isLoggedIn) {
      // console.log('heereeeeeeee')
      // this.nav.setRoot(HomePage);
    } else {
      this.nav.setRoot(LoginPage);
    }
  }

  async openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // console.log('here in home... 12434',page.title)
    if (page.title == "Home") {
      // console.log('here in home... 12434')
      this.nav.setRoot(page.component);
    } else if (page.title == "Logout") {
      this.logout();
    } else if (page.title == "Delete Account") {
      try {
        const result = await this.ApiProvider.presentConfirm(
          "Are you sure you want to delete account?",
          "Wound Care Pro"
        );
        if (result == "success") {
          this.ApiProvider.showLoader();
          this.ApiProvider.common_post_withToken("deleteAccount", {}).subscribe(
            (result) => {
              if (result.body.status) {
                localStorage.clear();
                localStorage.removeItem("user");
                localStorage.removeItem("loggedIn");
                this.nav.setRoot(LoginPage);
              }
              this.ApiProvider.hideLoader();
              this.ApiProvider.showLongToast("Account deleted.");
            },
            (error) => {
              this.ApiProvider.hideLoader();
              this.ApiProvider.showLongToast(
                "Account deletion failed. Please try again."
              );
            }
          );
        }
      } catch (e) {}
    } else {
      this.nav.push(page.component);
    }
  }

  logout() {
    // console.log('hereeeee');
    this.ApiProvider.presentConfirm(
      "Are you sure you want to logout?",
      "Wound Care Pro"
    )
      .then((result) => {
        localStorage.clear();
        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");
        this.nav.setRoot(LoginPage);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  menuClosed() {}
}
