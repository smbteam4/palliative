import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
// import { LoginPage } from '../pages/login/login';
import { LoginPageModule } from '../pages/login/login.module';
// import { SignupPage } from '../pages/signup/signup';
import { SignupPageModule } from '../pages/signup/signup.module';
// import { VerificationPage } from '../pages/verification/verification';
import { VerificationPageModule } from '../pages/verification/verification.module'
// import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { ForgotpasswordPageModule } from '../pages/forgotpassword/forgotpassword.module';
// import { ChangepasswordPage } from '../pages/changepassword/changepassword';
import { ChangepasswordPageModule } from '../pages/changepassword/changepassword.module';
// import { ProfilePage } from '../pages/profile/profile';
import { ProfilePageModule } from '../pages/profile/profile.module';
// import { ContactPage } from '../pages/contact/contact';
import { ContactPageModule } from '../pages/contact/contact.module';
// import { PaymentPage } from '../pages/payment/payment';
import { PaymentPageModule } from '../pages/payment/payment.module';
// import { PaymentsccessPage } from '../pages/paymentsccess/paymentsccess';
import { PaymentsccessPageModule } from '../pages/paymentsccess/paymentsccess.module';
import { InterceptorProvider } from '../providers/interceptor/interceptor';
// import { SubscriptionPage } from '../pages/subscription/subscription';
import { SubscriptionPageModule } from '../pages/subscription/subscription.module';
// import { GalleryPage } from '../pages/gallery/gallery';
import {  GalleryPageModule } from '../pages/gallery/gallery.module';
// import { ContentpagesPage } from '../pages/contentpages/contentpages';
import { ContentpagesPageModule } from '../pages/contentpages/contentpages.module';
import { DetailPageModule } from '../pages/detail/detail.module';
// import { DetailPage } from '../pages/detail/detail';
// import { SubDetailPage } from '../pages/sub-detail/sub-detail';
import { SubDetailPageModule } from '../pages/sub-detail/sub-detail.module';
//import { AppCropperPageModule } from '../pages/app-cropper/app-cropper.module'
// import { AboutUsPage } from '../pages/about-us/about-us';
import { AboutUsPageModule } from '../pages/about-us/about-us.module';
// import { TermsOfUsePage } from '../pages/terms-of-use/terms-of-use';
import { TermsOfUsePageModule } from '../pages/terms-of-use/terms-of-use.module';
// import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { PrivacyPolicyPageModule } from '../pages/privacy-policy/privacy-policy.module';
// import { DesclaimerPage } from '../pages/desclaimer/desclaimer';
import { DesclaimerPageModule } from '../pages/desclaimer/desclaimer.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule,  HTTP_INTERCEPTORS  } from '@angular/common/http';
import { ApiProvider } from '../providers/api/api';
import { Toast } from '@ionic-native/toast';
import { IonicStorageModule } from '@ionic/storage';
import { StripeProvider } from '../providers/stripe/stripe';
import { Stripe } from '@ionic-native/stripe';
import { AppPluginProvider } from '../providers/app-plugin/app-plugin';
import { ActionSheet } from '@ionic-native/action-sheet';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { PhotoViewer } from '@ionic-native/photo-viewer';
// import { ValidatorsProvider } from '../providers/validators/validators';
import { ValidationService } from '../providers/validators/validators';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    // LoginPage,
    // SignupPage,
    // VerificationPage,
    // ForgotpasswordPage,
    // ChangepasswordPage,
    // ProfilePage,
    // ContactPage,
    // PaymentPage,
    // PaymentsccessPage,
    // SubscriptionPage,
    // GalleryPage,
    // ContentpagesPage,
    // DetailPage,
    // SubDetailPage,
    // AppCropperPage,
    // DesclaimerPage,
    // PrivacyPolicyPage,
    // TermsOfUsePage,
    // AboutUsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AboutUsPageModule,
    ChangepasswordPageModule,
//    AppCropperPageModule,
    ContactPageModule,
    ContentpagesPageModule,
    DesclaimerPageModule,
    DetailPageModule,
    ForgotpasswordPageModule,
    GalleryPageModule,
    LoginPageModule,
    PaymentPageModule,
    PaymentsccessPageModule,
    PrivacyPolicyPageModule,
    ProfilePageModule,
    SignupPageModule,
    SubDetailPageModule,
    SubscriptionPageModule,
    TermsOfUsePageModule,
    VerificationPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    // LoginPage,
    // SignupPage,
    // VerificationPage,
    // ForgotpasswordPage,
    // ChangepasswordPage,
    // ProfilePage,
    // ContactPage,
    // PaymentPage,
    // PaymentsccessPage,
    // SubscriptionPage,
    // GalleryPage,
    // ContentpagesPage,
    // DetailPage,
    // SubDetailPage,
    // AppCropperPage,
    // DesclaimerPage,
    // PrivacyPolicyPage,
    // TermsOfUsePage,
    // AboutUsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    ApiProvider,
    PhotoViewer,
    Toast,
    StripeProvider,
    Stripe,
    AppPluginProvider,
    ActionSheet,
    Camera,
    Crop,
    
  ]
})
export class AppModule {}
