import { DetailsrequestPage } from './../detailsrequest/detailsrequest';
import { Component ,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,Events} from 'ionic-angular';
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
  public rejectedOrders : Order [] = [] ;

  constructor(public zone: NgZone , public events : Events,public auth:AuthServiceProvider,public orderProv:OrderProvider,public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController ) {
   this.custId = this.auth.getUserId();
   this.listOrdersNow();
   this.listOrderDone();
  
  }

ionViewDidLoad() {
  console.log('ionViewDidLoad HistoryPage');
  this.subscribeOrders();
}

gotodetailsrequest(){
  this.navCtrl.push(DetailsrequestPage);
}
toggleMenu()
{
  this.menuCtrl.toggle();
}

listOrdersNow(){
  this.orderProv.getOrdersByCustomer(this.custId,Order.NoResponseStatus).then((res)=>{
    // this.noOrders = res;
    console.log(res);
    this.noOrders = res;
    console.log(this.noOrders);
  });
  this.orderProv.getOrdersByCustomer(this.custId,Order.PendingStatus).then((res)=>{
    console.log(res);
    this.pendingOrders = res;
  });
  this.orderProv.getOrdersByCustomer(this.custId,Order.RejectedStatus).then((res)=>{
    console.log(res);
    this.rejectedOrders = res;
  })
}

listOrderDone(){
  this.orderProv.getOrdersByCustomer(this.custId,Order.DeliveredStatus).then((res)=>{
    console.log(res);
    this.deliveredOrders = res;
  });
}

subscribeOrders(){
  console.log("DONE");
  this.orderProv.subscribeToCustomerHistory((order : Order)=> this.zone.run(()=>{
    console.log(order);
  }));
}
}
