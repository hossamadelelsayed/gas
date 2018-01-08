import { DetailsrequestPage } from './../detailsrequest/detailsrequest';
import { Component ,NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,Events} from 'ionic-angular';
import {OrderProvider} from "../../providers/order/order";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Order} from "../../models/order";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {User} from "../../models/user";

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

  constructor(public zone: NgZone , public events : Events,public auth:AuthServiceProvider,
              public orderProv:OrderProvider,public navCtrl: NavController, public navParams: NavParams,
              public menuCtrl: MenuController , public commonService : CommonServiceProvider) {
   // this.custId = this.auth.getUserId();
   // this.listOrdersNow();
   // this.listOrderDone();

  }

ionViewWillEnter() {
  console.log('ionViewDidLoad HistoryPage');
  this.custId = this.auth.getUserId();
  this.listOrdersNow();
  this.listOrderDone();
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
    this.commonService.sortArray(this.noOrders,'deliveryDate',this.commonService.SortDESC);
    console.log(this.noOrders);
  });
  this.orderProv.getOrdersByCustomer(this.custId,Order.PendingStatus).then((res)=>{
    console.log(res);
    this.pendingOrders = res;
    this.commonService.sortArray(this.pendingOrders,'deliveryDate',this.commonService.SortDESC);
  });
  this.orderProv.getOrdersByCustomer(this.custId,Order.RejectedStatus).then((res)=>{
    console.log(res);
    this.rejectedOrders = res;
    this.commonService.sortArray(this.rejectedOrders,'deliveryDate',this.commonService.SortDESC);
  })
}

listOrderDone(){
  this.orderProv.getOrdersByCustomer(this.custId,Order.DeliveredStatus).then((res)=>{
    console.log(res);
    this.deliveredOrders = res;
    this.commonService.sortArray(this.deliveredOrders,'deliveryDate',this.commonService.SortDESC);
  });
}
  convertDate(timestamp : Date) : Date {
    return this.commonService.convertTimestampToDate(timestamp);
  }
  goToDetails(order : Order){
    this.navCtrl.push(DetailsrequestPage,{
      user : User.Customer ,
      order : order
    });
  }


}
