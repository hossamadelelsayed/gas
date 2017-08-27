import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import {NotificationsPage} from "../notifications/notifications";
import{CallusPage} from "../callus/callus";
import{AboutaprogramPage}from "../aboutaprogram/aboutaprogram";
import {TermsandprivacyPage} from "../termsandprivacy/termsandprivacy";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public platform: Platform,private translate: TranslateService ) {
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
chlang(){
this.platform.setDir('ltr', true);
console.log('iuhyio');
}

}
