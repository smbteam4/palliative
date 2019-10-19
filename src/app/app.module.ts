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
import { InterceptorProvider } from '../providers/interceptor/interceptor';
import { SubscriptionPage } from '../pages/subscription/subscription';
import { GalleryPage } from '../pages/gallery/gallery';
import { ContentpagesPage } from '../pages/contentpages/contentpages';
import { DetailPage } from '../pages/detail/detail';
import { SubDetailPage } from '../pages/sub-detail/sub-detail';
import { AppCropperPage } from '../pages/app-cropper/app-cropper';
import { AboutUsPage } from '../pages/about-us/about-us';
import { TermsOfUsePage } from '../pages/terms-of-use/terms-of-use';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { DesclaimerPage } from '../pages/desclaimer/desclaimer';

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
// import { ValidatorsProvider } from '../providers/validators/validators';
import { ValidationService } from '../providers/validators/validators';

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
    SubscriptionPage,
    GalleryPage,
    ContentpagesPage,
    DetailPage,
    SubDetailPage,
    AppCropperPage,
    DesclaimerPage,
    PrivacyPolicyPage,
    TermsOfUsePage,
    AboutUsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    SubscriptionPage,
    GalleryPage,
    ContentpagesPage,
    DetailPage,
    SubDetailPage,
    AppCropperPage,
    DesclaimerPage,
    PrivacyPolicyPage,
    TermsOfUsePage,
    AboutUsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    ApiProvider,
    Toast,
    StripeProvider,
    Stripe,
    AppPluginProvider,
    ActionSheet,
    Camera,
    Crop
  ]
})
export class AppModule {}
