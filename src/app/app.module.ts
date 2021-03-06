import { SelectagentPage } from './../pages/selectagent/selectagent';
import { NotificationsPage } from './../pages/notifications/notifications';
import { CallusPage } from './../pages/callus/callus';
import { AboutaprogramPage } from './../pages/aboutaprogram/aboutaprogram';
import { AddressPage } from './../pages/address/address';
import { AddvaluationPage } from './../pages/addvaluation/addvaluation';
import { SettingsPage } from './../pages/settings/settings';
import { FollowrequestPage } from './../pages/followrequest/followrequest';
import { PaywayPage } from './../pages/payway/payway';
import { AddcardPage } from './../pages/addcard/addcard';
import { ProfilePage } from './../pages/profile/profile';
import { OrderlocationPage} from './../pages/orderlocation/orderlocation';


import { NativeStorage } from '@ionic-native/native-storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';

import { RegistermemberPage } from './../pages/registermember/registermember';
import { MainPage } from './../pages/main/main';
import {TeamregisterPage} from "./../pages/teamregister/teamregister";
import {EditaccountPage} from "./../pages/editaccount/editaccount";

import { WelcomePage } from './../pages/welcome/welcome';
import { ConfirmPage } from './../pages/confirm/confirm';
import { ForgotpasswordPage } from './../pages/forgotpassword/forgotpassword';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Http, HttpModule} from "@angular/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CreateorderPage} from"../pages/createorder/createorder";
import {DetailsrequestPage} from "../pages/detailsrequest/detailsrequest";
import {HistoryPage} from "../pages/history/history";
import {TermsandprivacyPage} from "../pages/termsandprivacy/termsandprivacy";
import {OrderlaterPage} from "../pages/orderlater/orderlater";
import{CustomerProvider} from "../providers/customer/customer";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Firebase } from '@ionic-native/firebase';
import { FCM } from '@ionic-native/fcm';
import { BackgroundMode } from '@ionic-native/background-mode';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import * as firebase from "firebase";
import { FirebaseDatabaseProvider } from '../providers/firebase-database/firebase-database';
import { Events } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { DistributorProvider } from '../providers/distributor/distributor';
import {MainService} from "../providers/main-service";
import {CustomerMapPage} from "../pages/customer-map/customer-map";
import {HossamtestPage} from "../pages/hossamtest/hossamtest";
import * as GeoFire from "geofire";
import { Geolocation } from '@ionic-native/geolocation';
import {HosstestPage} from "../pages/hosstest/hosstest";
import {OrderProvider} from "../providers/order/order";
import {CustomerLocationProvider} from "../providers/customer/customerLocation";

import { EmailComposer } from '@ionic-native/email-composer';

import {EditaccountdisPage} from "../pages/editaccountdis/editaccountdis";
import {DistHistoryPage} from "../pages/dist-history/dist-history";
import { AboutusProvider } from '../providers/aboutus/aboutus';
import {CommonServiceProvider} from "../providers/common-service/common-service";
import {TrackingMapPage} from "../pages/tracking-map/tracking-map";
import {LaunchNavigator} from "@ionic-native/launch-navigator";
import { RateProvider } from '../providers/rate/rate';
import { PushNotificationsProvider } from '../providers/push-notifications/push-notifications';

const  firebaseConfig = {
  apiKey: "AIzaSyAzmtOBtWYDL4srdRqEfZFiwsq1rs2JHOA",
  authDomain: "gasksa-de4ab.firebaseapp.com",
  databaseURL: "https://gasksa-de4ab.firebaseio.com",
  projectId: "gasksa-de4ab",
  storageBucket: "gasksa-de4ab.appspot.com",
  messagingSenderId: "193816669511"
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateorderPage,
    DetailsrequestPage,
    HistoryPage,
    ForgotpasswordPage,
    ConfirmPage,
    WelcomePage,
    MainPage,
    RegistermemberPage,
    ProfilePage,
    AddcardPage,
    PaywayPage,
    FollowrequestPage,
    SettingsPage,
    AddvaluationPage,
    AddressPage,
    AboutaprogramPage,
    CallusPage,
    NotificationsPage,
    SelectagentPage,
    TermsandprivacyPage,
    OrderlaterPage,
    EditaccountPage,
    TeamregisterPage,
    HosstestPage ,
    CustomerMapPage,
    HossamtestPage,
    EditaccountdisPage,
    OrderlocationPage,
    EditaccountdisPage ,
    DistHistoryPage,
    TrackingMapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateorderPage,
    DetailsrequestPage,
    HistoryPage,
    ForgotpasswordPage,
    ConfirmPage,
    WelcomePage,
    MainPage,
    RegistermemberPage,
    ProfilePage,
    AddcardPage,
    PaywayPage,
    FollowrequestPage,
    SettingsPage,
    AddvaluationPage,
    AddressPage,
    AboutaprogramPage,
    CallusPage,
    NotificationsPage,
    SelectagentPage,
    TermsandprivacyPage,
    OrderlaterPage,
    EditaccountPage,
    TeamregisterPage,
    HosstestPage,
    CustomerMapPage,
    HossamtestPage,
    EditaccountdisPage,
    OrderlocationPage,
    DistHistoryPage,
    TrackingMapPage
  ],
  providers: [
 NativeGeocoder,
StatusBar,
    SplashScreen,
    MainService,
    Geolocation,
    OrderProvider,PushNotificationsProvider,
    CustomerLocationProvider,
    Camera,
    SMS,Firebase
    ,FCM
    ,BackgroundMode,
    CallNumber,EmailComposer,CustomerProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,Events,
    FirebaseDatabaseProvider,
    IonicStorageModule,NativeStorage,
    DistributorProvider,
    AndroidPermissions,
    CommonServiceProvider,
    LaunchNavigator,
    AboutusProvider,
    RateProvider,
     ]
})
export class AppModule {}
