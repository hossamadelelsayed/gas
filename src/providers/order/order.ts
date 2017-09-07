import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Order} from "../../models/order";
import {User} from "../../models/user";
import * as firebase from "firebase";

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class OrderProvider {
  public fireDatabase : any;
  public fireAuth : any;
  constructor(public http: Http) {
    console.log('Hello OrderProvider Provider');

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
          let customerOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+Order.NoResponseStatus+'/'+orderSnapshot.key) ;
          customerOrderRef.child('orderID').set(orderSnapshot.key).then(()=>{
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
    let customerOrderRef = this.fireDatabase.ref('/customers/'+customerID+'/history/'+statusType);
    let promise = new Promise((resolve, reject) => {
      customerOrderRef.once("value")
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
  assignDistributer(orderID : string , distributerID : string) : Promise <boolean>
  {
    let promise = new Promise((resolve, reject) => {
      let orderRef = this.fireDatabase.ref('/history/'+orderID);
      let order : Order ;
          orderRef.child('distributerID').set(distributerID)
            .then(()=>{
              orderRef.once("value")
                .then((snapshot : any)=> {
                  order = <Order>snapshot.val();
              this.moveCustomerOrderToPending(order).then(()=>{
                this.addPendingOrderToDistributer(order).then(()=>{
                  orderRef.child('status').set(Order.PendingStatus)
                    .then(()=>{
                      resolve(true);
                    }).catch((err)=>reject(err));
            }).catch((err)=>reject(err));
        }).catch((err)=>reject(err));
      }).catch((err)=>reject(err));
    }).catch((err)=>reject(err));
  });
    return promise ;
  };
  addPendingOrderToDistributer(order : Order) : Promise<boolean>
  {
    let promise = new Promise((resolve, reject) => {
      let distPendingOrderRef = this.fireDatabase.ref('/distributors/'+order.distributerID+'/history/'+Order.PendingStatus + '/' + order.orderID) ;
      distPendingOrderRef.child('orderID').set(order.orderID).then(()=>{
        resolve(true);
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
  moveCustomerOrderToPending(order : Order) : Promise <boolean>
  {
    let promise = new Promise((resolve, reject ) => {
      let customerPendingOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+Order.PendingStatus + '/' + order.orderID) ;
      customerPendingOrderRef.child("orderID").set(order.orderID)
        .then(()=>{
          let customerOriginOrderRef = this.fireDatabase.ref('/customers/'+order.customerID+'/history/'+order.status + '/' + order.orderID) ;
          customerOriginOrderRef.remove()
            .then(()=>{
              resolve(true);
            }).catch((err)=>reject(err));
        }).catch((err)=>reject(err));
    });
    return promise ;
  }
}
