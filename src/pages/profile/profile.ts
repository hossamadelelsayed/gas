import { AddressPage } from './../address/address';
import { SettingsPage } from './../settings/settings';
import { FollowrequestPage } from './../followrequest/followrequest';
import { PaywayPage } from './../payway/payway';
import { AddcardPage } from './../addcard/addcard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}
