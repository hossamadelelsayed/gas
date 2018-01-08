import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Events, MenuController} from 'ionic-angular';
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../models/order";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {DetailsrequestPage} from "../detailsrequest/detailsrequest";
import * as firebase from "firebase";
import {User} from "../../models/user";
import { PushNotificationsProvider } from '../../providers/push-notifications/push-notifications';
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

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
  disableDistFlag:boolean
  constructor(private auth:AuthServiceProvider,public notification:PushNotificationsProvider,public navCtrl: NavController, public navParams: NavParams,
              public orderService : OrderProvider  ,
               public commonService : CommonServiceProvider ,
              private fireAuth : AuthServiceProvider,

              public zone: NgZone , public events : Events ,
              public menuCtrl : MenuController ) {


  }

  ionViewWillEnter() {
     this.currentOrder = [] ;
    this.lastOrder  = [] ;
    this.disableDistFlag=true;
      this.distUID = firebase.auth().currentUser.uid;
      let ref=firebase.database().ref('distributors/')
///////////////////
    let self =this;
      ///////////
      ref.child(this.distUID+'/credit').on('value',(dataSnapshot)=>{
          self.auth.checkDistState(firebase.auth().currentUser.uid).then(state=>{
              console.log(state)
              if(state){
                  // this.navCtrl.push(DistHistoryPage);
                  // this.navCtrl.setRoot(DistHistoryPage);

              }else {
                  alert('الحساب معطل لمزيد من التفاصيل برجاء زيارة موقعنا www.gasksa.com')
              }
          });
          if(dataSnapshot.val()==0){
              this.disableDistFlag=false;
          }else{
              this.disableDistFlag=true;

          }
          console.log('credit',dataSnapshot.val())

      })

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
      this.currentOrder=[]
    this.orderService.subscribeToDistHistory((order : Order)=> this.zone.run(()=>{
      console.log('order before filtration',order)

     if(order.status == Order.PendingStatus)
     {
       console.log(order)
       this.currentOrder.push(order);
       this.sortCurrentOrderByDeliveryDate();
     }
    }));
    this.orderService.subscribeToDistOrder((order : Order)=> this.zone.run(()=> {
      console.log('order h',order)
        if(order.status != Order.PendingStatus)
        {
            console.log(order)
            this.currentOrder.push(order);
            this.sortCurrentOrderByDeliveryDate();
        }
    }));
    //sending device token id to db
    this.notification.sendDistToken(this.orderService.city);

    this.orderService.subscribeToDistOrderRemoved((orderID : string)=> this.zone.run(()=>this.delOrder(orderID)));
    //دي مش عارف لازمة امها ايه
    this.orderService.getOrdersByDist(this.distUID,Order.PendingStatus)
      .then((orders : Order[])=>{console.log(orders);this.pushToCurrentOrder(orders)}).catch((err)=>console.log(err));
    this.orderService.getOrdersByDist(this.distUID,Order.DeliveredStatus)
      .then((orders : Order[])=>{console.log(orders);this.pushToLastOrder(orders)}).catch((err)=>console.log(err));
    // this.orderService.getOrderAssignToAllDist(this.orderService.city)
    //   .then((orders : Order[]) => this.pushToCurrentOrder(orders)).catch((err)=>console.log(err));
    this.orderService.getOrderAssignToSpecificDist(this.orderService.city,this.distUID)
      .then((orders : Order[]) => this.pushToCurrentOrder(orders)).catch((err)=>console.log(err));
  }


  delOrder(orderID : string){
    console.log('delEnter');
    console.log('before',this.currentOrder.length);
    for(let i = 0; i < this.currentOrder.length; i++){

      if(this.currentOrder[i].orderID == orderID ) {
        this.currentOrder.splice(i, 1);
        console.log('after',this.currentOrder.length);
 //test
        //
      }
    }
    this.sortCurrentOrderByDeliveryDate();
    // let orderFilter :Order[]  ;
    // orderFilter = this.currentOrder.filter((order : Order) => {
    //   return (order.orderID != orderID);
    // });
    // this.currentOrder = orderFilter;

  }
  pushToLastOrder(orders : Order[]){
      this.lastOrder=[]
    orders.forEach((order  : Order)=>{
      this.lastOrder.push(order);

    });
    this.sortLastOrderByDeliveryDate();
  }
  pushToCurrentOrder(orders : Order[]){
    this.currentOrder=[]
    orders.forEach((order  : Order)=>{
      if(order !=null){
      this.currentOrder.push(order);
    }
    });
    this.sortCurrentOrderByDeliveryDate();
  }
  sortCurrentOrderByDeliveryDate(){
    this.commonService.sortArray(this.currentOrder,'deliveryDate',this.commonService.SortDESC);
  }
  sortLastOrderByDeliveryDate(){
    this.commonService.sortArray(this.lastOrder,'deliveryDate',this.commonService.SortDESC);
  }
  acceptOrder(orderID : string){
    this.commonService.presentLoading("Please Wait ...");
    this.orderService.distOrderAccept(orderID,this.distUID).then(()=>{

      //هنا بيقبل الorder
        this.distUID = firebase.auth().currentUser.uid;
        let creditRef=firebase.database().ref('distributors/')

        creditRef.child(this.distUID+'/credit').once('value').then(dataSnapshot=>{
          let credit=dataSnapshot.val()-1
            creditRef.child(this.distUID+'/credit').set(credit)
            // if(dataSnapshot.val()==0){
            //     this.disableDistFlag=false;
            // }
            console.log('credit',dataSnapshot.val())

        })
//         let ref=firebase.database().ref('distributors/')
//         ref.child(this.distUID).once('value',dataSnapshot=>{
//           ref.child('credit').once('value',credit=>{
// console.log('credit',credit.val())
//           })
//         })
////////////////
//////
///
//order list rerender
this.initSubscriptions();
      this.commonService.dismissLoading(true);
      this.commonService.successToast();
    }).catch((err)=>console.log(err));
  }
  rejectOrder(orderID : string){
    this.commonService.presentLoading("Please Wait ...");
    this.orderService.rejectOrder(orderID,this.distUID).then(()=>{


      ////////////////
      //////
      ///
      //order list rerender
      this.initSubscriptions();
      this.commonService.dismissLoading(true);
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
  toggleMenu()
  {
    this.menuCtrl.toggle();
  }

}
