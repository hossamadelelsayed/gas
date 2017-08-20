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

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {CreateorderPage} from"../pages/createorder/createorder";
import {DetailsrequestPage} from "../pages/detailsrequest/detailsrequest";
import {HistoryPage} from "../pages/history/history";
import{TermsandprivacyPage} from "../pages/termsandprivacy/termsandprivacy";
import{OrderlaterPage} from "../pages/orderlater/orderlater";
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
    IonicModule.forRoot(MyApp)
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
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
