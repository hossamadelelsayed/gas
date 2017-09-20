import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../models/order";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {DetailsrequestPage} from "../detailsrequest/detailsrequest";
import * as firebase from "firebase";
import {User} from "../../models/user";

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
   public currentOrder : Order[] = [] ;
  public lastOrder : Order[] = [] ;
  public distUID : string ;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public orderService : OrderProvider  ,
               public commonService : CommonServiceProvider ,
              public zone: NgZone , public events : Events) {
      this.distUID = firebase.auth().currentUser.uid;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistHistoryPage');
      this.initSubscriptions();
    // you have to get geolocation then reverse via geocoder
  }
  ionViewWillLeave()
  {
  //   this.events.unsubscribe(Order.ordersToAllDistRemovedEvent);
  //   this.events.unsubscribe(Order.ordersToSpecificDistRemovedEvent);
  //   this.events.unsubscribe(Order.distHistoryChangeEvent);
   }
  initSubscriptions()
  {
    // you have to get geolocation then reverse via geocoder

    this.orderService.subscribeToDistHistory((order : Order)=> this.zone.run(()=>{
     if(order.status == Order.PendingStatus)
        this.currentOrder.push(order);
    }));
    this.orderService.subscribeToDistOrder((order : Order)=> this.zone.run(()=> this.currentOrder.push(order)));
    this.orderService.subscribeToDistOrderRemoved((orderID : string)=> this.zone.run(()=>this.delOrder(orderID)));
    this.orderService.getOrdersByDist(this.distUID,Order.PendingStatus)
      .then((orders : Order[])=>{console.log(orders);this.pushToCurrentOrder(orders)}).catch((err)=>console.log(err));
    this.orderService.getOrdersByDist(this.distUID,Order.DeliveredStatus)
      .then((orders : Order[])=>{console.log(orders);this.pushToLastOrder(orders)}).catch((err)=>console.log(err));
    this.orderService.getOrderAssignToAllDist("Alexandria Governorate")
      .then((orders : Order[]) => this.pushToCurrentOrder(orders)).catch((err)=>console.log(err));
    this.orderService.getOrderAssignToSpecificDist("Alexandria Governorate",this.distUID)
      .then((orders : Order[]) => this.pushToCurrentOrder(orders)).catch((err)=>console.log(err));
  }


  delOrder(orderID : string){
    console.log('delEnter');
    console.log('before',this.currentOrder.length);
    for(let i = 0; i < this.currentOrder.length; i++){
      if(this.currentOrder[i].orderID == orderID ) {
        this.currentOrder.splice(i, 1);
        console.log('after',this.currentOrder.length);
      }
    }
    // let orderFilter :Order[]  ;
    // orderFilter = this.currentOrder.filter((order : Order) => {
    //   return (order.orderID != orderID);
    // });
    // this.currentOrder = orderFilter;

  }
  pushToLastOrder(orders : Order[]){
    orders.forEach((order  : Order)=>{
      this.lastOrder.push(order);
    })
  }
  pushToCurrentOrder(orders : Order[]){
    orders.forEach((order  : Order)=>{
      this.currentOrder.push(order);
    })
  }
  acceptOrder(orderID : string){
    this.commonService.presentLoading("Please Wait ...");
    this.orderService.distOrderAccept(orderID,this.distUID).then(()=>{
      this.commonService.dismissLoading();
      this.commonService.successToast();
    }).catch((err)=>console.log(err));
  }
  rejectOrder(orderID : string){
    this.commonService.presentLoading("Please Wait ...");
    this.orderService.rejectOrder(orderID,this.distUID).then(()=>{
      this.commonService.dismissLoading();
      this.commonService.successToast();
      this.delOrder(orderID);
    }).catch((err)=>console.log(err));
  }
  convertDate(timestamp : Date) : Date {
    return this.commonService.convertTimestampToDate(timestamp);
  }
  goToDetails(order : Order){
    this.navCtrl.push(DetailsrequestPage,{
      user : User.Distributor ,
      order : order
    });
  }
}
