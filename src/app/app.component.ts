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
import {Component, ViewChild, NgZone} from '@angular/core';
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
import {OrderProvider} from "../providers/order/order";
import {Order} from "../models/order";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  welcomePage = HosstestPage ; //DistHistoryPage ; //HosstestPage; // ;
  //welcomePage = null;  //WelcomePage;
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
              private storage: Storage ,
              public orderService : OrderProvider  ,
              public zone: NgZone) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.orderService.login().then((dist)=>{
        console.log('login');
        this.orderService.listenToDistOrder('Alexandria Governorate',dist.uid);
        this.orderService.listenToDistOrderRemoved('Alexandria Governorate',dist.uid);
      }).catch((err)=>console.log(err));

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
    // this.storage.get('lang').then((res)=>{
    //   if(res){
    //     this.translate.setDefaultLang(res);
    //     console.log(res);
    //   }
    //   else{
    //     this.translate.setDefaultLang('ar');
    //     console.log('arabic');
    //   }
    // });

    this.translate.setDefaultLang('ar');
    platform.setDir('rtl', true);
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
}
