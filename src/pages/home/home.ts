import { Component } from '@angular/core';
import {LoadingController, NavController, Platform} from 'ionic-angular';
import {MainPage} from "../main/main";
import {ForgotpasswordPage} from "../forgotpassword/forgotpassword";
import {RegistermemberPage} from "../registermember/registermember";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {OrderlocationPage} from "../orderlocation/orderlocation"
import { Storage } from '@ionic/storage';
import {NativeStorage} from '@ionic-native/native-storage';
import {HistoryPage} from "../history/history";
import {DistHistoryPage} from "../dist-history/dist-history";
import {OrderProvider} from "../../providers/order/order";
import {CommonServiceProvider}from"../../providers/common-service/common-service"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public mobile:any;
public password:any;


constructor(public commonService:CommonServiceProvider,public loadingCtrl: LoadingController, public platform: Platform,public navCtrl: NavController,private auth:AuthServiceProvider,public nativeStorage:NativeStorage,private events:Events,
  private toastCtrl: ToastController,public translateService : TranslateService ,
  private storage: Storage , public orderService : OrderProvider) {
    // this.auth.AnonymousSignIn();
  }

gotocreateorder()
{

this.commonService.presentLoading('Logging In');
  this.auth.doLogin(this.mobile,this.password).then((user)=>{
<<<<<<< HEAD
  this.commonService.dismissLoading();
=======
  this.commonService.dismissLoading(true);
>>>>>>> ff8edbadb769e22c9f87933fe460f88d15b23a2a
    console.log(user['uEmail']);
    // this.auth.getUserId;
    console.log(user['uType']);
    if(user['uType']=='distributors'){
      this.navCtrl.push(DistHistoryPage);
      this.navCtrl.setRoot(DistHistoryPage);
      this.orderService.attachDistListeners();
    }
    else{
      this.navCtrl.push(MainPage);
      this.navCtrl.setRoot(MainPage);
      this.orderService.attachCustomerListeners();
    }
    this.storage.set('type',user['uType']);
    this.nativeStorage.setItem('phone',this.mobile);
    this.nativeStorage.setItem('password',this.password);
    console.log(this.mobile);
  }).catch((err)=>{
<<<<<<< HEAD
    this.commonService.dismissLoading();
=======
    this.commonService.dismissLoading(true);
>>>>>>> ff8edbadb769e22c9f87933fe460f88d15b23a2a
    console.log(err.message);
    this.translateAndToast(err.message);
  });

}

gotoforgotpassword(){
this.navCtrl.push(ForgotpasswordPage);

}
gotoreg(){
this.navCtrl.push(RegistermemberPage);
}
presentToast(text:any) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'bottom'
  });
toast.present();
}
 translateAndToast(word : string)
  {
    this.translateService.get(word).subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);
      }
    );
  }
}
