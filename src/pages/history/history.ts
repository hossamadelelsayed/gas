import { DetailsrequestPage } from './../detailsrequest/detailsrequest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import {OrderProvider} from "../../providers/order/order";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Order} from "../../models/order"; 
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public custId:string;
  public noOrders : Order [] = [];
  public pendingOrders :  Order [] = [];
  public deliveredOrders :  Order [] = [];


  constructor(public auth:AuthServiceProvider,public order:OrderProvider,public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController ) {
   this.custId = this.auth.getUserId();
   this.listOrdersNow();
   this.listOrderDone();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
gotodetailsrequest(){
  this.navCtrl.push(DetailsrequestPage);
}
toggleMenu()
{
  this.menuCtrl.toggle();
}

listOrdersNow(){

  this.order.getOrdersByCustomer(this.custId,"noResponse").then((res)=>{
    // this.noOrders = res;
    console.log(res);
    this.noOrders = res;
    console.log(this.noOrders);
  });
  this.order.getOrdersByCustomer(this.custId,"pending").then((res)=>{
    console.log(res);
    this.pendingOrders = res;
  });
}

listOrderDone(){
  this.order.getOrdersByCustomer(this.custId,"delivered").then((res)=>{
    console.log(res);
    this.deliveredOrders = res;
  });
}

}
