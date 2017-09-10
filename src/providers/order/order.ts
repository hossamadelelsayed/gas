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
  createOrder(order : Order) : Promise<Order>
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
        status: Order.NoResponseStatus
      }).then((orderSnapshot:any)=>{
        console.log(orderSnapshot.key);
        let OrderInstanceRef = this.fireDatabase.ref('/history/'+orderSnapshot.key);
        OrderInstanceRef.child('orderID').set(orderSnapshot.key).then(()=>{
          let customerOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+orderSnapshot.key) ;
          this.publishOrderToAllDist('Alexandria Governorate',orderSnapshot.key);
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
  updateOrder(order : Order): Promise<Order>
  {
    let promise = new Promise((resolve, reject) => {
      let orderRef = this.fireDatabase.ref('/history/'+order.orderID);
      orderRef.update(order).then(()=>{
        resolve(order);
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
  deleteOrder(orderID : string , userID ?: string ,userType ?: string) : Promise<any>
  {
    let promise = new Promise((resolve, reject) => {
      let order : Order ;
      let orderRef = this.fireDatabase.ref('/history/'+orderID);
      orderRef.once('value').then((snapshot : any)=>{
        order = <Order>snapshot.val() ;
        if(order.status == Order.NoResponseStatus)
        {
          let customerOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+order.status+'/'+orderID);
          orderRef.remove().then(()=>{
            customerOrderRef.remove().then(()=>{
              resolve(true);
            }).catch((err)=> reject(err));
          }).catch((err)=> reject(err));
        }
        else {
          switch (userType) {
            case User.Customer : {
              orderRef.child('rejectedBy').set(User.Customer)
                .then(()=>{
                orderRef.child('status').set(Order.RejectedStatus);
                // moveing to
                let customerRejectedOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+Order.RejectedStatus + '/' + order.orderID) ;
                customerRejectedOrderRef.child("orderID").set(order.orderID)
                  .then(()=>{
                    let customerOriginOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+order.status + '/' + order.orderID) ;
                    customerOriginOrderRef.remove()
                      .then(()=>{
                        resolve(true);
                      }).catch((err)=>reject(err));
                  }).catch((err)=>reject(err));
              }).catch((err)=>reject(err));
              break;
            }
            case User.Distributor : {
              orderRef.child('rejectedBy').set(User.Distributor)
                .then(()=>{
                  //to be handled
              }).catch((err)=>reject(err));
              break;
            }
            default: {
              reject("User Type Must Has Value");
              break;
            }
          }
        }
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
    let promises : Promise<any>[] = [] ;
    let promise = new Promise((resolve, reject) => {
      let orderRef = this.fireDatabase.ref('/history/'+orderID);
      let order : Order ;
      promises.push(orderRef.child('distributerID').set(distributerID).then(()=>{
        resolve(true)
        console.log('true 1');
      }).catch((err)=>reject(err)));
      promises.push(orderRef.child('status').set(Order.PendingStatus).then(()=>{
        resolve(true)
        console.log('true 2');
      }).catch((err)=>reject(err)));
      orderRef.once('value').then((orderSnapShot)=>{
        order = orderSnapShot.val();
        let customerOrderRef = this.fireDatabase.ref('customers/'+order.customerID+'/history/'+orderID);
        let distOrderRef = this.fireDatabase.ref('distributors/'+order.distributerID+'/history/'+orderID);
        customerOrderRef.child('status').set(Order.PendingStatus).catch((err)=>reject(err));
        distOrderRef.child('status').set(Order.PendingStatus).catch((err)=>reject(err));
        distOrderRef.child('orderID').set(orderID).catch((err)=>reject(err));
      }).catch((err)=>reject(err));
      this.removeOrderFromAllDist("Alexandria Governorate",orderID);
      Promise.all(promises).then(()=>{
        resolve(true)
        console.log('final true');
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
  distOrderReject(orderID : string , distributerID : string)
  {

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
  publishOrderToAllDist(city : string , orderID : string) : Promise <boolean>
  {
    let promise = new Promise((resolve, reject ) => {
      let AllDistCityRef = this.fireDatabase.ref('/ordersToAllDist/'+city +'/' +orderID) ;
      AllDistCityRef.child('orderID').set(orderID).then(()=>{
        resolve(true);
      }).catch((err) => reject(err));
    });
    return promise ;
  }
  ordersToAllDistCreated(city : string)
  {
    let ordersRef = firebase.database().ref('ordersToAllDist/' + city);
    ordersRef.on('child_added', (data) => {
      let historyRef = firebase.database().ref('history/' + data.key);
      historyRef.once('value').then((orderSnapShot)=>{
        this.events.publish('ordersToAllDist:created',<Order>orderSnapShot.val());
      });
    });
  }
  ordersToAllDistRemoved(city : string)
  {
    let ordersRef = firebase.database().ref('ordersToAllDist/' + city);
    ordersRef.on('child_removed', (data) => {
      this.events.publish('ordersToAllDist:removed',data.key);
    });
  }













  // may be look at it later
  //assignDistributer(orderID : string , distributerID : string) : Promise <boolean>
  // {
  //   let promise = new Promise((resolve, reject) => {
  //     let orderRef = this.fireDatabase.ref('/history/'+orderID);
  //     let order : Order ;
  //         orderRef.child('distributerID').set(distributerID)
  //           .then(()=>{
  //             orderRef.once("value")
  //               .then((snapshot : any)=> {
  //                 order = <Order>snapshot.val();
  //             this.moveCustomerOrderToPending(order).then(()=>{
  //               this.addPendingOrderToDistributer(order).then(()=>{
  //                 orderRef.child('status').set(Order.PendingStatus)
  //                   .then(()=>{
  //                     resolve(true);
  //                   }).catch((err)=>reject(err));
  //           }).catch((err)=>reject(err));
  //       }).catch((err)=>reject(err));
  //     }).catch((err)=>reject(err));
  //   }).catch((err)=>reject(err));
  // });
  //   return promise ;
  // };
  // addPendingOrderToDistributer(order : Order) : Promise<boolean>
  // {
  //   let promise = new Promise((resolve, reject) => {
  //     let distPendingOrderRef = this.fireDatabase.ref('/distributors/'+order.distributerID+'/history/'+Order.PendingStatus + '/' + order.orderID) ;
  //     distPendingOrderRef.child('orderID').set(order.orderID).then(()=>{
  //       resolve(true);
  //     }).catch((err)=>reject(err));
  //   });
  //   return promise ;
  // }
  // moveCustomerOrderToPending(order : Order) : Promise <boolean>
  // {
  //   let promise = new Promise((resolve, reject ) => {
  //     let customerPendingOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+Order.PendingStatus + '/' + order.orderID) ;
  //     customerPendingOrderRef.child("orderID").set(order.orderID)
  //       .then(()=>{
  //         let customerOriginOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+order.status + '/' + order.orderID) ;
  //         customerOriginOrderRef.remove()
  //           .then(()=>{
  //             resolve(true);
  //           }).catch((err)=>reject(err));
  //       }).catch((err)=>reject(err));
  //   });
  //   return promise ;
  // }



}
