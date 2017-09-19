import { AboutaprogramPage } from './../pages/aboutaprogram/aboutaprogram';
import { NotificationsPage } from './../pages/notifications/notifications';
import { CallusPage } from './../pages/callus/callus';
import { HistoryPage } from './../pages/history/history';
import { WelcomePage } from './../pages/welcome/welcome';
import { ProfilePage } from './../pages/profile/profile';
import { HomePage } from './../pages/home/home';
import { RegistermemberPage } from './../pages/registermember/registermember';
import {CreateorderPage} from './../pages/createorder/createorder';
import {TeamregisterPage} from "./../pages/teamregister/teamregister";
import { Component,ViewChild } from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";
import {NavController} from 'ionic-angular';
import {MenuController} from 'ionic-angular';
import {MainService} from "../providers/main-service";
import { NativeStorage } from '@ionic-native/native-storage';
import { ToastController } from 'ionic-angular';

import {SettingsPage} from "../pages/settings/settings";
import {HosstestPage} from "../pages/hosstest/hosstest";
import {MainPage} from "../pages/main/main";
import {DistHistoryPage} from "../pages/dist-history/dist-history";

import { Storage } from '@ionic/storage';
<<<<<<< HEAD
=======
import {OrderProvider} from "../providers/order/order";
import {Order} from "../models/order";
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import { Events } from 'ionic-angular';
import * as firebase from "firebase";
import {CommonServiceProvider} from "../providers/common-service/common-service";
import {DetailsrequestPage} from "../pages/detailsrequest/detailsrequest";
>>>>>>> 131c4ec862a2ec0f9be23614ad8e699ba8f7d949

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  welcomePage = null;  //WelcomePage;
  settingsPage=SettingsPage;
  mainpage=MainPage;
  profilePage=ProfilePage;
  historyPage=HistoryPage;
  callusPage=CallusPage;
  notificationsPage=NotificationsPage;
  aboutaprogramPage=AboutaprogramPage
  teamregisterPage=TeamregisterPage;
  registermemberPage=RegistermemberPage;
  @ViewChild('nav') nav:NavController;
   public  MainService = MainService;
   public phone:string;
   public password:string;
  constructor( platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
               public translate : TranslateService ,
              private menuCtrl:MenuController,
              public nativeStorage:NativeStorage,
              private toastCtrl: ToastController,
<<<<<<< HEAD
              private storage: Storage) {
=======
              public orderService : OrderProvider  ,
               public commonService : CommonServiceProvider ,
               public alertCtrl : AlertController ,
               public auth:AuthServiceProvider,
               public translateService : TranslateService ,
              private storage: Storage,public events:Events) {
>>>>>>> 131c4ec862a2ec0f9be23614ad8e699ba8f7d949
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
<<<<<<< HEAD
=======
      this.orderService.subscribeToDistOrder((order : Order)=> {
        let view = this.nav.getActive();
        console.log(view.component);
        if(view.component != DistHistoryPage)
          this.newOrderAlert(order);
      });
      this.orderService.subscribeToCustomerHistory((order : Order)=> {
        switch(order.status)
        {
          case Order.PendingStatus : {
            this.alertCustomerOrder(order);
            break;
          }
          case Order.RejectedStatus : {
            this.alertCustomerOrder(order);
            break;
          }
          case Order.DeliveredStatus : {
            this.alertCustomerOrder(order);
            break;
          }
        }
      });




      // this.nativeStorage.getItem('phone').then((res)=>{
      //   this.presentToast(res);
      //  this.phone=res;
      // }).then(()=>{
      //   this.nativeStorage.getItem('password').then((res)=>{
      //     this.presentToast(res);
      //     this.password=res;
      //   }).then(()=>{
      //     this.storage.get('type').then((res)=>{
      //       this.presentToast(res);
      //       if(res=='distributors'){
      //         this.welcomePage=DistHistoryPage;
      //       }
      //       else{
      //         this.welcomePage=MainPage;
      //       }
      //     })
      //   })
      // }).catch(()=>{
      //   this.welcomePage=WelcomePage;
      // });
    });
    // this.translate.setDefaultLang('en');
    // platform.setDir('ltr', true);
>>>>>>> 131c4ec862a2ec0f9be23614ad8e699ba8f7d949
      this.nativeStorage.getItem('phone').then((res)=>{
        this.presentToast(res);
       this.phone=res;
      }).then(()=>{
        this.nativeStorage.getItem('password').then((res)=>{
          this.presentToast(res);
          this.password=res;
        }).then(()=>{
          this.storage.get('type').then((res)=>{
            this.presentToast(res);
            if(res=='distributors'){
              this.welcomePage=HistoryPage;
            }
            else{
              this.welcomePage=MainPage;
            }
          })
        }) 
      }).catch(()=>{
        this.welcomePage=WelcomePage;
      });
    });

    this.storage.get('lang').then((res)=>{ 
      console.log(res);
      if(res =='ar'){
        MainService.lang='ar';
        this.translate.setDefaultLang('ar');
        platform.setDir('rtl', true);
        console.log(res);
      }
      else if(res=='en')
      {
        MainService.lang='en';
        this.translate.setDefaultLang('en');
        platform.setDir('ltr', true);
        console.log(res);
      }
      else if(!res){
        MainService.lang='ar';
        this.translate.setDefaultLang('ar');
        platform.setDir('rtl', true);
        console.log(res);
      }
      else{
        console.log(res);
      }
    });

    // this.translate.setDefaultLang('ar');
    // platform.setDir('rtl', true);
<<<<<<< HEAD
=======

>>>>>>> 131c4ec862a2ec0f9be23614ad8e699ba8f7d949
  }
  onLoad(page:any){
      this.nav.push(page);
      this.menuCtrl.close();
  }
  presentToast(txt:any) {
    
      let toast = this.toastCtrl.create({
        message: txt,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
<<<<<<< HEAD
=======
  newOrderAlert(order : Order) {
    let alert = this.alertCtrl.create({
      title: 'Order No : '+order.orderID,
      message: 'Do you want to go to orders?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.nav.push(DistHistoryPage);
          }
        }
      ]
    });
    alert.present();
  }
  alertCustomerOrder( order : Order ){
    this.translateService.get(order.status).subscribe(
      value => {
        // value is our translated string
        let alert = this.alertCtrl.create({
          title: value + order.orderID,
          message: '',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Confirm',
              handler: () => {
                console.log('Cancel clicked');
                this.nav.push(DetailsrequestPage);
              }
            }
          ]
        });
        alert.present();
      }
    );
  }
>>>>>>> 131c4ec862a2ec0f9be23614ad8e699ba8f7d949
}
