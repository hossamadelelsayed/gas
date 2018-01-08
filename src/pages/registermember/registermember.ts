import { HomePage } from './../home/home';
import { ConfirmPage } from './../confirm/confirm';
import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import{MainPage} from "../main/main";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {TranslateService} from "@ngx-translate/core";
import {TeamregisterPage} from "../teamregister/teamregister";
import { Storage } from '@ionic/storage';
import {NativeStorage} from '@ionic-native/native-storage';
import {CommonServiceProvider} from "../../providers/common-service/common-service";

@Component({
  selector: 'page-registermember',
  templateUrl: 'registermember.html',
})
export class RegistermemberPage {
  private email : any;
  private password :any;
  private name :any;
  private phone : any ;

  constructor(private storage: Storage,public nativeStorage:NativeStorage,public translateService : TranslateService ,private toastCtrl:ToastController,
              public loadingCtrl: LoadingController,     public commonService:CommonServiceProvider,     private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistermemberPage');
  }

gotoconfirm(){
  let loading = this.loadingCtrl.create({
    content:'Please wait...'
  });
  let self = this;
    this.authService.register("customers",this.email,this.password,this.name,this.phone)
      .then((user) => {


      //console.log('sfggd');
      //console.log(user);
      //user.message;
        // this.authService.submitUserInfo()

        this.translateAndToast("Registration done");
        this.navCtrl.setRoot(MainPage);
         this.storage.set('type','customers');
        this.nativeStorage.setItem('phone',this.phone);
        this.nativeStorage.setItem('password',this.password);
        loading.dismiss();

      })

      // .catch(function(error) {
      //   console.log(error);
      //   this.translateAndToast(error);
      //   if(error.code === "auth/invalid-email"){
      //     console.log("err",error.code);

      //     this.translateAndToast(error.message);
      //   }
      // });
      .catch((err)=>{
        console.log(err.message);
        console.log(err);
        if(err.message)
        this.translateAndToast(err.message);
        else
        this.translateAndToast(err);
      });

}

gotohome(){
 this.navCtrl.push(HomePage);
}
gojoin(){
  this.navCtrl.push(TeamregisterPage);
}
gotocreateorder(){
 this.navCtrl.push(MainPage);
}

presentToast(txt:any) {

  let toast = this.toastCtrl.create({
    message: txt,
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
// private showError(txt:string){
//   const toast = this.toastCtrl.create({
//     message:txt,
//     duration:2500,
//     showCloseButton:true
//      });
//    toast.present();
//  }
}
