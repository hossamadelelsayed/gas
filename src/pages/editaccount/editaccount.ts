import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {TranslateService} from "@ngx-translate/core";
import {CommonServiceProvider} from "../../providers/common-service/common-service";

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
   public email:string;
   public myphone:number;
   public myemail:string;
  constructor(public translateService : TranslateService ,private toastCtrl:ToastController,public commonService:CommonServiceProvider,
    private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
      this.userid=this.authService.getUserId();
      this.userInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaccountPage');
  }

   editAccount(){
    this.commonService.presentLoading("Pleasw Wait...")
    let self = this;
    this.authService.editEmail('customers',this.userid,this.email,this.custNumber,this.password)
    .then((res)=>{
      console.log(res);
      console.log(this.email)
      /////
      self.translateAndToast("Email updated");
    self.authService.editCustomerName(self.custName)
        .then((user)=>{
           self.translateAndToast('Name updated');

        })
        .catch(function(error) {
          console.log(error);
          self.translateAndToast(error.message);
        });
      //   self.authService.editCustomerPhoneNo(self.custNumber)
      //   .then((user)=>{
      //     self.translateAndToast('Phone updated');
      //     self.navCtrl.pop();
      //  })
      self.authService.editPassword(self.password)
       .then((res)=>{
        console.log(res);
        console.log(self.password);
        self.translateAndToast("Password updated");
      }) .catch(function(error) {
        console.log(error);
        self.translateAndToast(error.message);
      });

      })
        .catch(function(error) {
         console.log(error);
         self.translateAndToast(error.message);
       });
  // this.commonService.dismissLoading()
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
