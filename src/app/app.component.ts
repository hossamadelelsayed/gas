import { AboutaprogramPage } from './../pages/aboutaprogram/aboutaprogram';
import { NotificationsPage } from './../pages/notifications/notifications';
import { CallusPage } from './../pages/callus/callus';
import { HistoryPage } from './../pages/history/history';
import { WelcomePage } from './../pages/welcome/welcome';
import { ProfilePage } from './../pages/profile/profile';

import { Component,ViewChild } from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";
import {NavController} from 'ionic-angular';
import {MenuController} from 'ionic-angular';

import {SettingsPage} from "../pages/settings/settings";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  welcomePage=WelcomePage;
  settingsPage=SettingsPage;
  profilePage=ProfilePage;
  historyPage=HistoryPage;
  callusPage=CallusPage;
  notificationsPage=NotificationsPage;
  aboutaprogramPage=AboutaprogramPage
  @ViewChild('nav') nav:NavController;
  constructor( platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public translate : TranslateService ,
  private menuCtrl:MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.translate.setDefaultLang('ar');
    platform.setDir('rtl', true);
  }
  onLoad(page:any){
this.nav.push(page);
this.menuCtrl.close();
  }
}


