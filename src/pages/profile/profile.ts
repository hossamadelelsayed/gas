import { AddressPage } from './../address/address';
import { SettingsPage } from './../settings/settings';
import { FollowrequestPage } from './../followrequest/followrequest';
import { PaywayPage } from './../payway/payway';
import { AddcardPage } from './../addcard/addcard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,Platform} from 'ionic-angular';
import {EditaccountPage} from "./../editaccount/editaccount";
import {EditaccountdisPage} from "./../editaccountdis/editaccountdis";
import { NativeStorage } from '@ionic-native/native-storage';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public Data:any;
  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public menuCtrl: MenuController,
      public platform: Platform,
      private fireAuth : AuthServiceProvider,
      private nativeStorage: NativeStorage) {  
  }
  
  // users(){
  //    this.Data = this.nativeStorage.getItem('typedis')
  //   .then(
  //     data => console.log(data),
  //     error => console.error(error)
  //   );
  //   console.log(this.Data);
  // }


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
  this.fireAuth.doLogout();
  this.platform.exitApp();
  console.log('exit');
}
}
