import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'page-editaccount',
  templateUrl: 'editaccount.html',
})
export class EditaccountPage {
   public custName : any;
   public custNumber : any;
  constructor(public translateService : TranslateService ,private toastCtrl:ToastController,
    private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaccountPage');
  }
 
   editAccount(){
    let self = this;
        this.authService.editCustomerName(this.custName)
        .then((user)=>{
           self.translateAndToast('Name updated');
           
        })
        .catch(function(error) {
          console.log(error);
          self.translateAndToast(error.message);
        });
        this.authService.editCustomerPhoneNo(this.custNumber)
        .then((user)=>{
          self.translateAndToast('Phone updated');
          self.navCtrl.pop();
       })
        .catch(function(error) {
         console.log(error);
         self.translateAndToast(error.message);
       });
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
          this.presentToast(value);
        }
      );
    }

   
}
