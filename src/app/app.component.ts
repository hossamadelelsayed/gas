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
import {Platform, AlertController} from 'ionic-angular';
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
import {AuthServiceProvider} from "../providers/auth-service/auth-service";
import { Events } from 'ionic-angular';
// import * as firebase from "firebase";
// import {CommonServiceProvider} from "../providers/common-service/common-service";
import {DetailsrequestPage} from "../pages/detailsrequest/detailsrequest";
import {User} from "../models/user";
import {AddvaluationPage} from "../pages/addvaluation/addvaluation";
import {Rate} from "../models/rate";
import {Geolocation} from "@ionic-native/geolocation";
import {DistributorProvider} from "../providers/distributor/distributor";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Firebase } from '@ionic-native/firebase';
import { PushNotificationsProvider } from '../providers/push-notifications/push-notifications';

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
  aboutaprogramPage=AboutaprogramPage;
  teamregisterPage=TeamregisterPage;
  registermemberPage=RegistermemberPage;
  @ViewChild('nav') nav:NavController;
   public  MainService = MainService;
   public phone:string;
   public password:string;
   appFlag:false;

  constructor( public notifications:PushNotificationsProvider,
    platform: Platform,
               private firebase: Firebase,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
               public translate : TranslateService ,
              private menuCtrl:MenuController,
              public nativeStorage:NativeStorage,
              private toastCtrl: ToastController,
              public orderService : OrderProvider  ,
               public alertCtrl : AlertController ,public auth:AuthServiceProvider,
              private storage: Storage,public events:Events,
               public  geolocation: Geolocation ,
               public distService : DistributorProvider,private androidPermissions: AndroidPermissions) {

    platform.ready().then(() => {

      platform.pause.subscribe(() => {
        console.log('[INFO] App paused');
        this.distService.onDistributorDisconnect();
      });
      platform.resume.subscribe(() => {

        // this.nav.push(this.nav.getActive().component)
        console.log('[INFO] App resumed');
        // this.nav.getPrevious()
        // return this.nav.getActive(;

      });

      if (platform.is('android') || platform.is('ios')) {
        try {
          this.notifications.onTokenRecived();
        }catch(E) {
          console.log(E)
        }
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
        success => console.log('Permission granted'),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
      );
      // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.GPS, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.geolocation.getCurrentPosition().then((resp) => {
        this.distService.getCurrentIpLocation(resp.coords.latitude ,resp.coords.longitude).then((city : string)=>{
          this.orderService.city = city ;
        }).catch((err)=>console.log(err));
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      this.orderService.subscribeToDistOrder((order : Order)=> {
        let view = this.nav.getActive();
        console.log(view.component);
        if(view.component != DistHistoryPage)
          this.newDistOrderAlert(order);
      });
      this.orderService.subscribeToDistHistory((order : Order)=> {
        if(order.status == Order.DeliveredStatus)
          this.nav.push(AddvaluationPage,{
            order : order ,
            mode : Rate.rateCustomerType
          });
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
            this.nav.push(AddvaluationPage,{
              order : order ,
              mode : Rate.rateDistType
            });
            break;
          }
        }
      });


      this.nativeStorage.getItem('phone').then((res)=>{
        // this.presentToast(res);
       this.phone=res;
      }).then(()=>{
        this.nativeStorage.getItem('password').then((res)=>{
          // this.presentToast(res);
          this.password=res;
          this.auth.doLogin(this.phone,this.password).then(()=>{
            this.storage.get('type').then((res)=>{
              // this.presentToast(res);
              if(res=='distributors'){
                this.welcomePage=DistHistoryPage;
                this.orderService.attachDistListeners();
              }
              else{
                this.welcomePage=MainPage;
                this.orderService.attachCustomerListeners();
              }
            })
          }).catch((err)=>console.log(err));
        })
      }).catch(()=>{
        this.welcomePage=WelcomePage;
      });
/////////////////////////
    // this.translate.setDefaultLang('ar');
    // platform.setDir('rtl', true);
    //   this.nativeStorage.getItem('phone').then((res)=>{
    //     console.log('auto login phone',res)
    //     this.presentToast(res);
    //     this.phone=res;
    //   }).then(()=>{
    //     this.nativeStorage.getItem('password').then((res)=>{
    //
    //       this.presentToast(res);
    //       this.password=res;
    //     }).then(()=>{
    //       this.storage.get('type').then((res)=>{
    //
    //
    //         this.presentToast(res);
    //         if(res=='distributors'){
    //           this.welcomePage=HistoryPage;
    //
    //         }
    //         else{
    //           this.welcomePage=MainPage;
    //         }
    //       })
    //     })
    //   }).catch(()=>{
    //     this.welcomePage=WelcomePage;
    //   });
    //
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


    });

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
    newDistOrderAlert(order : Order) {
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
            this.nav.push(DetailsrequestPage,{
              order : order ,
              user : User.Distributor
            });
          }
        }
      ]
    });
    alert.present();
  }
    alertCustomerOrder( order : Order ){
    this.translate.get(order.status).subscribe(
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
                this.nav.push(DetailsrequestPage,{
                  order : order ,
                  user : User.Customer
                });
              }
            }
          ]
        });
        alert.present();
      }
    );
  }
}
