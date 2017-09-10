import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../models/order";
import { Location} from "../../models/location";
import {CustomerLocationProvider} from "../../providers/customer/customerLocation";
import { Events } from 'ionic-angular';
/**
 * Generated class for the HosstestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-hosstest',
  templateUrl: 'hosstest.html',
})
export class HosstestPage {
 public orders : Order[] ;
  public locations : Location[] ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public orderService : OrderProvider , public customerService : CustomerLocationProvider ,
              public events: Events) {
    this.events.subscribe('ordersToAllDist:created', ( order : Order) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log(order);
    });
    this.events.subscribe('ordersToAllDist:removed', ( order) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log(order);
    });
    this.orderService.ordersToAllDistCreated('Alexandria Governorate');
    this.orderService.ordersToAllDistRemoved('Alexandria Governorate');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HosstestPage');
  }
  createLocation()
  {
    this.orderService.login().then((customer)=>{
      this.customerService.createLocation(customer.uid,new Location(565414.54,561412.48,'my home'))
        .then((res : Location)=>{
         console.log(res);
        }).catch((err)=>console.log(err));
    }).catch((err)=>console.log(err));
   }
  createOrder()
  {
    this.orderService.login().then((customer)=>{
         this.orderService.createOrder(new Order(customer.uid ,5,new Location(565414.54,561412.48,'my home'),'cash')).then((res)=>{
        console.log(res);
      }).catch((err)=>console.log(err));
    }).catch((err)=>console.log(err));
  }
  updateLocation()
  {
    this.orderService.login().then((customer)=>{
      this.customerService.updateLocation(customer.uid ,
        new Location(22222,11111,'hohoho','-KtRCKEhi7ISH5XyPUTU')).then((res)=>{
        console.log(res);
      }).catch((err)=>console.log(err));
    }).catch((err)=>console.log(err));
  }
  deleteLocation()
  {
    this.orderService.login().then((customer)=>{
      this.customerService.delLocation(customer.uid ,'-KtREMykD28hZqhLaRuC').then((res)=>{
        console.log(res);
      }).catch((err)=>console.log(err));
    }).catch((err)=>console.log(err));
  }
  getLocations()
  {
    this.orderService.login().then((customer)=>{
      this.customerService.getLocations(customer.uid).then((res : Location[])=>{
        console.log(res);
        this.locations = res ;
      }).catch((err)=>console.log(err));
    }).catch((err)=>console.log(err));
  }
  assign()
  {
    this.orderService.login().then((customer)=>{
      this.orderService.distOrderAccept("-KtfzjYP7o21V7M0ZbLq","7Q30a4rCSfSL1N5G5H2pnPqLBfq2").then((res)=>{
        console.log(res);
      }).catch((err)=>console.log(err));
    }).catch((err)=>console.log(err));
  }
  getOrdersByCustomer()
  {
    this.orderService.login().then((customer)=> {
      this.orderService.getOrdersByCustomer(customer.uid , Order.PendingStatus).then((res : Order[])=>{
        console.log(res.length);
        console.log(res);
        this.orders = res ;
      }).catch((err)=>console.log(err))
    }).catch((err)=>console.log(err));
  }
}
