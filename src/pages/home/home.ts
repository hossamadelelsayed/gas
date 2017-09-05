import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{MainPage} from "../main/main";
import{ForgotpasswordPage} from "../forgotpassword/forgotpassword";
import {RegistermemberPage} from "../registermember/registermember";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public mobile:any;
public password:any;
  constructor(public navCtrl: NavController,private auth:AuthServiceProvider,private events:Events,
  private toastCtrl: ToastController,   public translateService : TranslateService ) {
    this.auth.AnonymousSignIn();
  }

gotocreateorder()
{
  this.auth.doLogin(this.mobile,this.password).then(()=>{
    console.log("done");
    this.navCtrl.push(MainPage);
  }).catch((err)=>{
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
