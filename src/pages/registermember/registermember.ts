import { HomePage } from './../home/home';
import { ConfirmPage } from './../confirm/confirm';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import{MainPage} from "../main/main";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {TranslateService} from "@ngx-translate/core";
import {TeamregisterPage} from "../teamregister/teamregister";
/**
 * Generated class for the RegistermemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-registermember',
  templateUrl: 'registermember.html',
})
export class RegistermemberPage {
  private email : any;
  private password :any;
  private name :any;
  private phone : any ;
  constructor(public translateService : TranslateService ,private toastCtrl:ToastController,
              private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistermemberPage');
  }
gotoconfirm(){
  let self = this;
    this.authService.register("customers",this.email,this.password,this.name,this.phone)
      .then((user) => {
      console.log('sfggd');
      console.log(user);
      //user.message;
        // this.authService.submitUserInfo()
        this.translateAndToast("Registration done");
        this.navCtrl.push(MainPage);
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
        this.translateAndToast(err.message);
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
