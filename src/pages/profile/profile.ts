import { AddressPage } from './../address/address';
import { SettingsPage } from './../settings/settings';
import { FollowrequestPage } from './../followrequest/followrequest';
import { PaywayPage } from './../payway/payway';
import { AddcardPage } from './../addcard/addcard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,Platform} from 'ionic-angular';
import {EditaccountPage} from "./../editaccount/editaccount";
import {EditaccountdisPage} from "./../editaccountdis/editaccountdis";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
goaddcard(){
  this.navCtrl.push(AddcardPage);
}
gopayway(){
  this.navCtrl.push(PaywayPage);
}
gotofolwreq(){
  this.navCtrl.push(FollowrequestPage);
}
gotosettings(){
  this.navCtrl.push(SettingsPage);
}
addaddresses(){
  this.navCtrl.push(AddressPage);
}
toggleMenu()
{
  this.menuCtrl.toggle();
}
gotoeditaccount(){
this.navCtrl.push(EditaccountPage);
}
gotoeditaccountdis(){
  this.navCtrl.push(EditaccountdisPage);
}
exit(){
  this.platform.exitApp();
  console.log('exit');
}
}
