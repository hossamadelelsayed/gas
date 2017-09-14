import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../models/order";
import {HosstestPage} from "../hosstest/hosstest";
// import {CommonServiceProvider} from "../../providers/common-service/common-service";

/**
 * Generated class for the DistHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dist-history',
  templateUrl: 'dist-history.html',
})
export class DistHistoryPage {
   public showing : string = 'current' ;
   public distUID : string = 'GxzLyO0RIDNamRR8EGGygMuf93m2' ;
   public currentOrder : Order[] = [] ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public orderService : OrderProvider  , 
              // public commonService : CommonServiceProvider ,
              public zone: NgZone , public events : Events) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistHistoryPage');
  }

}
