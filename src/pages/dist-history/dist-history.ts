import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../models/order";
import {HosstestPage} from "../hosstest/hosstest";
import {CommonServiceProvider} from "../../providers/common-service/common-service";

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
   public Order  = Order ;
   public showing : string = 'current' ;
   public distUID : string = 'GxzLyO0RIDNamRR8EGGygMuf93m2' ;
   public currentOrder : Order[] = [] ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public orderService : OrderProvider  , public commonService : CommonServiceProvider ,
               public zone: NgZone , public events : Events) {


  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad DistHistoryPage');
    this.orderService.login().then((dist)=>{
      this.distUID = dist.uid ;
      this.initSubscriptions();
    }).catch((err)=>console.log(err));
    // you have to get geolocation then reverse via geocoder
  }
  ionViewWillLeave()
  {
    this.events.unsubscribe(Order.ordersToAllDistRemovedEvent);
    this.events.unsubscribe(Order.ordersToSpecificDistRemovedEvent);
    this.events.unsubscribe(Order.ordersToAllDistCreatedEvent);
    this.events.unsubscribe(Order.ordersToSpecificDistCreatedEvent);
  }
  initSubscriptions()
  {
    // you have to get geolocation then reverse via geocoder

    this.orderService.subscribeToDistOrder((order : Order)=> this.zone.run(()=>this.currentOrder.push(order)));
    this.orderService.subscribeToDistOrderRemoved((orderID : string)=> this.zone.run(()=>this.delOrder(orderID)));
    this.orderService.getOrdersByDist(this.distUID,Order.PendingStatus)
      .then((orders : Order[])=>{console.log(orders);this.pushToOrder(orders)}).catch((err)=>console.log(err));
  }


  delOrder(orderID : string){
    console.log('delEnter');
    console.log('before',this.currentOrder.length);
    for(let i = 0; i < this.currentOrder.length; i++){
      if(this.currentOrder[i].orderID == orderID ) {
        this.currentOrder.splice(i, 1);
        console.log('after',this.currentOrder.length);
        return;
      }
    }
    // let orderFilter :Order[]  ;
    // orderFilter = this.currentOrder.filter((order : Order) => {
    //   return (order.orderID != orderID);
    // });
    // this.currentOrder = order

  }
  pushToOrder(orders : Order[]){
    orders.forEach((order  : Order)=>{
      this.currentOrder.push(order);
    })
  }
  acceptOrder(orderID : string){
    this.orderService.distOrderAccept(orderID,this.distUID).then(()=>{
      this.commonService.successToast();
    }).catch((err)=>console.log(err));
  }
  rejectOrder(orderID : string){
    this.orderService.rejectOrder(orderID,this.distUID).then(()=>{
      this.commonService.successToast();
      this.delOrder(orderID);
    }).catch((err)=>console.log(err));
  }

}
