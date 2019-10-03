import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { VerificationPage } from '../pages/verification/verification';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { ProfilePage } from '../pages/profile/profile';
import { ContactPage } from '../pages/contact/contact';
import { PaymentPage } from '../pages/payment/payment';
import { PaymentsccessPage } from '../pages/paymentsccess/paymentsccess';
// import { SubscriptionPage } from '../pages/subscription/subscription';
import { GalleryPage } from '../pages/gallery/gallery';
import { ContentpagesPage } from '../pages/contentpages/contentpages';
import { DetailPage } from '../pages/detail/detail';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { ApiProvider } from '../providers/api/api';
import { Toast } from '@ionic-native/toast';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    VerificationPage,
    ForgotpasswordPage,
    ChangepasswordPage,
    ProfilePage,
    ContactPage,
    PaymentPage,
    PaymentsccessPage,
    // SubscriptionPage,
    GalleryPage,
    ContentpagesPage,
    DetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    VerificationPage,
    ForgotpasswordPage,
    ChangepasswordPage,
    ProfilePage,
    ContactPage,
    PaymentPage,
    PaymentsccessPage,
    // SubscriptionPage,
    GalleryPage,
    ContentpagesPage,
    DetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    Toast
  ]
})
export class AppModule {}
