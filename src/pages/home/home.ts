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
  private toastCtrl: ToastController,   public translateService : TranslateService) {

  }

gotocreateorder(){

  let self=this;
// this.auth.phoneLogin(this.mobile,this.password);
this.auth.phoneLogin('01000','123456');
this.events.subscribe('email status', (user) => {
  self.auth.userDelet();
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log("llll",user);
    if(user.email){
     self.translateAndToast('Login Done sucessfully');
     self.navCtrl.push(MainPage);
    }
    else if(user.email==null){
        self.translateAndToast('you must register');
        self.navCtrl.push(RegistermemberPage);
    }
     self.auth.doLogin(""+user.email,self.password);
  });
  
//   let self=this;
// this.auth.phoneLogin('01000','123456');
// this.events.subscribe('email status', (user) => {
//    self.auth.userDelet();
//     // user and time are the same arguments passed in `events.publish(user, time)`
//     console.log("llll",user);
//     if(user.uid){
//      self.translateAndToast('Login Done sucessfully');
//      self.navCtrl.push(MainPage);
//     }
//     else if(user.email==null){
//         self.translateAndToast('you must register');
//         self.navCtrl.push(RegistermemberPage);
//     }
//      self.auth.doLogin(""+user.email,self.password);
//   });
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
