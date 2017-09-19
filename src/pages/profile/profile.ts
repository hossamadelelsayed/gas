import { AddressPage } from './../address/address';
import { SettingsPage } from './../settings/settings';
import { FollowrequestPage } from './../followrequest/followrequest';
import { PaywayPage } from './../payway/payway';
import { AddcardPage } from './../addcard/addcard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,Platform} from 'ionic-angular';
import {EditaccountPage} from "./../editaccount/editaccount";
import {EditaccountdisPage} from "./../editaccountdis/editaccountdis";
import { Storage } from '@ionic/storage';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import { AlertController } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import { NativeStorage } from '@ionic-native/native-storage';
import {MainPage} from "../main/main";
import {OrderProvider} from "../../providers/order/order";
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public Data:string;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      public menuCtrl: MenuController,
      public platform: Platform,
      private fireAuth : AuthServiceProvider,
      private storage: Storage,
      private alertCtrl: AlertController,
      public translateService : TranslateService,
      public nativeStorage:NativeStorage ,
      public orderService : OrderProvider) {
  }



  ionViewWillEnter() {
// let self=this;
      console.log('ionViewDidLoad ProfilePage');
      this.getUserType().then(val=>{
        this.Data=val;
      });
  console.log(this.Data);
  }
  getUserType():Promise<string>{
    let promise=new Promise((resolve,reject)=>{

      this.storage.get('type').then((val) => {
        console.log('type', val);
        this.Data=val;
        resolve(val);
      });
    });
    return promise;
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
presentConfirm() {
  let alert = this.alertCtrl.create({
    title: "Logout",
    message: 'Do you want to Logout ?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {

          console.log('Cancel clicked');
        }
      },
      {
        text: 'Logout',
        handler: () => {
          console.log('logout clicked');
          this.fireAuth.doLogout();
          this.storage.clear();
          this.nativeStorage.clear();
          this.platform.exitApp();
          this.orderService.detachDistListeners();
          this.orderService.detachCustomerListeners();
          // this.navCtrl.push(MainPage);
          console.log('exit');
        }
      }
    ]
  });
  alert.present();
}
translate(word : string)
{
  this.translateService.get(word).subscribe(
    value => {
      // value is our translated string
    }
  );
}
// exit(){
//   this.fireAuth.doLogout();
//   this.platform.exitApp();
//   console.log('exit');
// }
}
