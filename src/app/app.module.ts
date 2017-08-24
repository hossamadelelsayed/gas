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

import { RegistermemberPage } from './../pages/registermember/registermember';
import { MainPage } from './../pages/main/main';
import { WelcomePage } from './../pages/welcome/welcome';
import { ConfirmPage } from './../pages/confirm/confirm';
import { ForgotpasswordPage } from './../pages/forgotpassword/forgotpassword';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
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
import{TermsandprivacyPage} from "../pages/termsandprivacy/termsandprivacy";
import{OrderlaterPage} from "../pages/orderlater/orderlater";
//
// import { AuthServiceProvider } from '../providers/auth-service/auth-service';
// import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import * as firebase from "firebase";
import { FirebaseDatabaseProvider } from '../providers/firebase-database/firebase-database';
import { Events } from 'ionic-angular';
import { UserInfoProvider } from '../providers/user-info/user-info';
import { IonicStorageModule } from '@ionic/storage';
const firebaseConfig = {

  apiKey: "AIzaSyABCYlsZaDjiORLZeTb6DtpCdEpkmD4-xk",
      authDomain: "gasksa-f284a.firebaseapp.com",
      databaseURL: "https://gasksa-f284a.firebaseio.com",
      projectId: "gasksa-f284a",
      storageBucket: "gasksa-f284a.appspot.com",
      messagingSenderId: "783994879598"
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
    OrderlaterPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
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
    OrderlaterPage

  ],
  providers: [
    StatusBar,
    SplashScreen,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,Events,
    FirebaseDatabaseProvider,
    UserInfoProvider ,IonicStorageModule ]
})
export class AppModule {}
