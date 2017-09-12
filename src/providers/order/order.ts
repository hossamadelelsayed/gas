import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Order} from "../../models/order";
import {User} from "../../models/user";
import * as firebase from "firebase";
import {Events} from "ionic-angular";

/*
  Generated class for the OrderProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class OrderProvider {
  public fireDatabase : any;
  public fireAuth : any;
  constructor(public http: Http,public events: Events) {
    console.log('Hello OrderProvider Provider');
    this.fireAuth = firebase.auth();
    this.fireDatabase = firebase.database();
  }
  login(): Promise<any>
  {
    this.fireAuth = firebase.auth();
    this.fireDatabase = firebase.database();
    return this.fireAuth.signInWithEmailAndPassword("hossamadelelsayed@gmail.com","Hossam521992");
  }
  createOrder(order : Order,  distributerID : string = null) : Promise<Order>
  {
    let promise = new Promise((resolve, reject) => {
      let histroyRef = this.fireDatabase.ref('/history');
      histroyRef.push({
        customerID: order.customerID,
        pipesNo: order.pipesNo,
        location: order.location,
        paymentType: order.paymentType,
        deliveryDate : order.deliveryDate,
        monthly : order.monthly,
        date: firebase.database.ServerValue.TIMESTAMP,
        status: Order.NoResponseStatus ,
        assignDistType : distributerID == null ? Order.AssignAllDist : Order.AssignSpecificDist ,
        assignDistID : distributerID
      }).then((orderSnapshot:any)=>{
        console.log(orderSnapshot.key);
        let OrderInstanceRef = this.fireDatabase.ref('/history/'+orderSnapshot.key);
        OrderInstanceRef.child('orderID').set(orderSnapshot.key).then(()=>{
          let customerOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+orderSnapshot.key) ;
          if(distributerID != null)
            this.publishOrderToSpecificDist('Alexandria Governorate',orderSnapshot.key,distributerID);
          else this.publishOrderToAllDist('Alexandria Governorate',orderSnapshot.key);
          customerOrderRef.update({
            orderID : orderSnapshot.key ,
            status : Order.NoResponseStatus
          }).then(()=>{
            OrderInstanceRef.once('value').then((snapshot)=>{
              resolve(<Order>snapshot.val());
            }).catch((err)=>reject(err));
          }).catch((err)=>reject(err));
        }).catch((err)=>reject(err));
      }).catch((err)=>{
        reject(err);
      });
    });
    return promise ;
  }
  getOrdersByCustomer(customerID : string , statusType : string) : Promise<Order[]>
  {
    let orders : Order[] = [] ;
    let customerOrderRef = this.fireDatabase.ref('/customers/'+customerID+'/history');
    let promise = new Promise((resolve, reject) => {
      customerOrderRef.orderByChild('status').equalTo(statusType).once("value")
        .then((snapshot)=>{
          snapshot.forEach((childSnapshot) => {
            let orderHistoryRef = this.fireDatabase.ref('/history/'+childSnapshot.key);
            orderHistoryRef.once('value').then((orderSnapshot)=>{
              orders.push(<Order>orderSnapshot.val())
              }).catch((err)=>reject(err));
          });
        resolve(orders);
        }).catch((err)=>reject(err));
    });
    return promise ;
  }
  distOrderAccept(orderID : string , distributerID : string) : Promise <boolean>
  {
    let promises : Promise<boolean>[] = [] ;
    let promise = new Promise((resolve, reject) => {
      let orderRef = this.fireDatabase.ref('/history/'+orderID);
      promises.push(orderRef.child('distributerID').set(distributerID).catch((err)=>reject(err)));
      promises.push(orderRef.child('status').set(Order.PendingStatus).catch((err)=>reject(err)));
      promises.push(this.distAndCustToPendingOrder(orderRef).catch((err)=>reject(err)));
      Promise.all(promises).then(()=>{
        resolve(true);
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
  private distAndCustToPendingOrder(orderRef :  firebase.database.Reference)  : Promise <boolean>
  {
    let promises : Promise<boolean>[] = [] ;
    let order : Order ;
    let promise = new Promise((resolve, reject) => {
      orderRef.once('value').then((orderSnapShot)=>{
        order = orderSnapShot.val();
        let customerOrderRef = this.fireDatabase.ref('customers/'+order.customerID+'/history/'+order.orderID);
        let distOrderRef = this.fireDatabase.ref('distributors/'+order.distributerID+'/history/'+order.orderID);
        promises.push(customerOrderRef.child('status').set(Order.PendingStatus).catch((err)=>reject(err)));
        promises.push(distOrderRef.child('status').set(Order.PendingStatus).catch((err)=>reject(err)));
        promises.push(distOrderRef.child('orderID').set(order.orderID).catch((err)=>reject(err)));
        if(order.assignDistType == Order.AssignAllDist)
          promises.push(this.removeOrderFromAllDist("Alexandria Governorate",order.orderID).catch((err)=>reject(err)));
        else promises.push(this.removeOrderFromSpecificDist("Alexandria Governorate",order.orderID ,order.distributerID).catch((err)=>reject(err)));
        Promise.all(promises).then(()=>{
          resolve(true);
        }).catch((err)=>reject(err));
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
  private publishOrderToAllDist(city : string , orderID : string) : Promise <boolean>
  {
    let promise = new Promise((resolve, reject ) => {
      let AllDistCityOrderRef = this.fireDatabase.ref('ordersToAllDist/'+city +'/' +orderID) ;
      AllDistCityOrderRef.child('orderID').set(orderID).then(()=>{
        resolve(true);
      }).catch((err) => reject(err));
    });
    return promise ;
  }
  private publishOrderToSpecificDist(city : string , orderID : string , distributerID : string) : Promise <boolean>
  {
    let promise = new Promise((resolve, reject ) => {
      let orderNotificationDistRef = this.fireDatabase.ref('valid/'+ city +'/' + distributerID + '/notification/' +orderID) ;
      orderNotificationDistRef.child('orderID').set(orderID).then(()=>{
        resolve(true);
      }).catch((err) => reject(err));
    });
    return promise ;
  }
  listenToDistOrder(city : string , distributerID : string)
  {
      this.listenToOrderAssignToAllDist(city) ;
      this.listenToOrderAssignToSpecificDist(city , distributerID);
  }
  listenToOrderAssignToAllDist(city : string)
  {
    let ordersRef = firebase.database().ref('ordersToAllDist/' + city);
    ordersRef.on('child_added', (data) => {
      let historyRef = firebase.database().ref('history/' + data.key);
      historyRef.once('value').then((orderSnapShot)=>{
        this.events.publish('ordersToAllDist:created',<Order>orderSnapShot.val());
      });
    });
  }
  listenToOrderAssignToSpecificDist(city : string , distributerID : string)
  {
    let orderNotificationDistRef = this.fireDatabase.ref('valid/'+ city +'/' + distributerID + '/notification') ;
    orderNotificationDistRef.on('child_added', (data) => {
      let historyRef = firebase.database().ref('history/' + data.key);
      historyRef.once('value').then((orderSnapShot)=>{
        this.events.publish('ordersToSpecificDist:created',<Order>orderSnapShot.val());
      });
    });
  }
  listenToDistOrderRemoved(city : string , distributerID : string)
  {
    this.listenToAllDistOrderRemoved(city);
    this.listenToSpecificDistOrderRemoved(city , distributerID);
  }
  listenToAllDistOrderRemoved(city : string)
  {
    let ordersRef = firebase.database().ref('ordersToAllDist/' + city);
    ordersRef.on('child_removed', (data) => {
      this.events.publish('ordersToAllDist:removed',data.key);
    });
  }
  listenToSpecificDistOrderRemoved(city : string , distributerID : string)
  {
    let orderNotificationDistRef = this.fireDatabase.ref('valid/'+ city +'/' + distributerID + '/notification') ;
    orderNotificationDistRef.on('child_removed', (data) => {
      this.events.publish('ordersToSpecificDist:removed',data.key);
    });
  }
  private removeOrderFromAllDist(city : string , orderID : string) : Promise <boolean>
  {
    let promise = new Promise((resolve, reject ) => {
      let AllDistCityRef = this.fireDatabase.ref('/ordersToAllDist/'+city +'/' +orderID) ;
      AllDistCityRef.remove().then(()=>{
        resolve(true);
      }).catch((err) => reject(err));
    });
    return promise ;
  }
  private removeOrderFromSpecificDist(city : string , orderID : string ,  distributerID : string) : Promise <boolean>
  {
    let promise = new Promise((resolve, reject ) => {
      let orderNotificationDistRef = this.fireDatabase.ref('valid/'+ city +'/' + distributerID + '/notification/' +orderID) ;
      orderNotificationDistRef.remove().then(()=>{
        resolve(true);
      }).catch((err) => reject(err));
    });
    return promise ;
  }
  private rejectOrderNoResponseCase(order : Order) : Promise <boolean>
  {
    let promises : Promise<any>[] = [] ;
    let promise = new Promise((resolve, reject) => {
      let orderRef = this.fireDatabase.ref('/history/'+order.orderID);
      let customerOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+order.orderID);
        promises.push(orderRef.remove().catch((err)=> reject(err)));
        promises.push(customerOrderRef.remove().catch((err)=> reject(err)));
        if(order.assignDistType == Order.AssignAllDist)
          promises.push(this.removeOrderFromAllDist("Alexandria Governorate",order.orderID).catch((err)=>reject(err)));
        else promises.push(this.removeOrderFromSpecificDist("Alexandria Governorate",order.orderID ,order.assignDistID).catch((err)=>reject(err)));
        Promise.all(promises).then(()=>resolve(true)).catch((err)=>reject(err));
    });
    return promise ;
  }
  private rejectOrderPendingByCustomer(order : Order , customerID :string): Promise <boolean>
  {
    let promises : Promise<any>[] = [] ;
    let promise = new Promise((resolve, reject) => {
      let customerOrderRef = this.fireDatabase.ref('customers/'+order.customerID+'/history/'+order.orderID);
      let distOrderRef = this.fireDatabase.ref('distributors/'+order.distributerID+'/history/'+order.orderID);
      let orderRef = this.fireDatabase.ref('/history/'+order.orderID);
      promises.push(orderRef.child('rejectedBy').set(User.Customer).catch((err)=>reject(err)));
      promises.push(orderRef.child('status').set(Order.RejectedStatus).catch((err)=>reject(err)));
      promises.push(customerOrderRef.child('status').set(Order.RejectedStatus).catch((err)=>reject(err)));
      promises.push(distOrderRef.child('status').set(Order.RejectedStatus).catch((err)=>reject(err)));
      Promise.all(promises).then(()=>resolve(true)).catch((err)=>reject(err));
    });
    return promise ;
  }
  private rejectOrderPendingByDist(order : Order , DistID :string): Promise <boolean>
  {
    let promises : Promise<any>[] = [] ;
    let promise = new Promise((resolve, reject) => {
      let customerOrderRef = this.fireDatabase.ref('customers/'+order.customerID+'/history/'+order.orderID);
      let distOrderRef = this.fireDatabase.ref('distributors/'+order.distributerID+'/history/'+order.orderID);
      let orderRef = this.fireDatabase.ref('/history/'+order.orderID);
      promises.push(orderRef.child('rejectedBy').set(User.Distributor).catch((err)=>reject(err)));
      promises.push(orderRef.child('status').set(Order.RejectedStatus).catch((err)=>reject(err)));
      promises.push(customerOrderRef.child('status').set(Order.RejectedStatus).catch((err)=>reject(err)));
      promises.push(distOrderRef.child('status').set(Order.RejectedStatus).catch((err)=>reject(err)));
      Promise.all(promises).then(()=>resolve(true)).catch((err)=>reject(err));
    });
    return promise ;
  }
  private rejectOrderPendingCase(order : Order , userID : string) : Promise <boolean>
  {
    let userType = null ;
    if(order.customerID == userID)
      userType = User.Customer ;
    else if (order.distributerID == userID)
      userType = User.Distributor ;
    let promise = new Promise((resolve, reject) => {
      switch (userType) {
        case User.Customer :
          console.log('customer');
          this.rejectOrderPendingByCustomer(order , userID).then(()=>resolve(true)).catch((err)=>reject(err));
          break ;
        case User.Distributor :
          console.log('dist');
          this.rejectOrderPendingByDist(order , userID).then(()=>resolve(true)).catch((err)=>reject(err));
          break ;
      }
    });
    return promise ;
  }
  rejectOrder(orderID : string , userID ?: string ) : Promise <boolean>
  {
    let promise = new Promise((resolve, reject) => {
      let order : Order ;
      let orderRef = this.fireDatabase.ref('/history/'+orderID);
      orderRef.once('value').then((snapshot : any)=> {
        order = <Order>snapshot.val();
        if(order.status == Order.NoResponseStatus)
          this.rejectOrderNoResponseCase(order).then(()=>resolve(true)).catch((err)=>console.log(err));
        else this.rejectOrderPendingCase(order,userID).then(()=>resolve(true)).catch((err)=>console.log(err));
        }).catch((err)=>reject(err));
      });
    return promise ;
  }
  updateOrder(order : Order): Promise <Order>
  {
    let promise = new Promise((resolve, reject) => {
      let orderRef = this.fireDatabase.ref('/history/'+order.orderID);
      orderRef.update(order).then(()=>{
        resolve(order);
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
}
