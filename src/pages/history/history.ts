import { DetailsrequestPage } from './../detailsrequest/detailsrequest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import {OrderProvider} from "../../providers/order/order";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  public custId:string;
  public noOrders : any;
  public pendingOrders : any;
  public deliveredOrders : any;


  constructor(public auth:AuthServiceProvider,public order:OrderProvider,public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController ) {
   this.custId = this.auth.getUserId();
   this.listOrdersNow();
  console.log("NO Response Orders"+this.noOrders);
  console.log("Pending Orders"+this.pendingOrders);
   this.listOrderDone();
  console.log("Delivered Orders"+this.deliveredOrders);
    
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
    this.noOrders = res;
  });
  this.order.getOrdersByCustomer(this.custId,"pending").then((res)=>{
    this.pendingOrders = res;
  });
}

listOrderDone(){
  this.order.getOrdersByCustomer(this.custId,"delivered").then((res)=>{
    this.deliveredOrders = res;
  });
}

}
