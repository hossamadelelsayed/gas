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
   public password:any;
   public userid:any;
   public myname:string;
   public phone:number;
   public email:string;
   public myphone:number;
   public myemail:string;
  constructor(public translateService : TranslateService ,private toastCtrl:ToastController,
    private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
      this.userid=this.authService.getUserId();
      this.userInfo();
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
       this.authService.editPassword(this.password)
       .then((res)=>{
        console.log(res);
        console.log(this.password);
        this.translateAndToast("Password updated");
      })
      this.authService.editEmail('customers',this.userid,this.email,this.phone,this.password)
      .then((res)=>{
        console.log(res);
        console.log(this.email)
        this.translateAndToast("Email updated");
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

    userInfo(){
      this.authService.getUserInfo(this.userid,'customers').then((res)=>{
        this.myname=res.name;
        this.myphone=res.phoneNo;
        this.myemail=res.email;
        console.log(res);
      }).catch((err)=>{
        console.log('err',err);
      });
    }
}
