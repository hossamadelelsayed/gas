import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {TranslateService} from "@ngx-translate/core";
import { ToastController } from 'ionic-angular';



@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
public email:string;
public onclick:boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams,private auth:AuthServiceProvider,
    private toastCtrl: ToastController,
    public translateService : TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
    
  }
  
  recover(){
    this.auth.resetPassword(this.email);
    this.translateAndToast("Check your email");
    this.onclick = false;
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
