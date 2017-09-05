import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform,MenuController} from 'ionic-angular';
import {NotificationsPage} from "../notifications/notifications";
import{CallusPage} from "../callus/callus";
import{AboutaprogramPage}from "../aboutaprogram/aboutaprogram";
import {TermsandprivacyPage} from "../termsandprivacy/termsandprivacy";
import {TranslateService} from "@ngx-translate/core";
import {MainService} from "../../providers/main-service";
import { NativeStorage } from '@ionic-native/native-storage';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  public toggleStatus:any;
  public MainService : MainService = MainService ;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public platform: Platform,
     private translate: TranslateService,
     public menuCtrl: MenuController,
     private nativeStorage: NativeStorage  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
gotonotifications(){
  this.navCtrl.push(NotificationsPage);
}
gotocallus(){this.navCtrl.push(CallusPage);}
gotoaboutprogram(){this.navCtrl.push(AboutaprogramPage);}
gototermsandprivacy(){this.navCtrl.push(TermsandprivacyPage);}

Change_Toggle(type) {
  this.translate.setDefaultLang(type);
  MainService.lang = type;
  if(type == 'en')
    this.platform.setDir('ltr', true);
  else
    this.platform.setDir('rtl', true);
}
toggleMenu()
{
  this.menuCtrl.toggle();
}
}
