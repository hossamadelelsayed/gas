import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../models/order";
import {Location} from "../../models/location";
import {User} from "../../models/user";
import {CustomerLocationProvider} from "../../providers/customer/customerLocation";

/**
 * Generated class for the HossamtestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-hossamtest',
  templateUrl: 'hossamtest.html',
})
export class HossamtestPage {
  public orderTest : Order = null ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public orderProvider : OrderProvider , public customerService : CustomerLocationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HossamtestPage');
  }
  create()
  {
    this.orderProvider.createOrder(new Order("D1mgEvVGy5WmSVDgcyobS7OexCo2",
                                              5,
                                              new Location(48979874.65,534545.46,'hello work'),
                                              "cash"))
      .then((order : Order)=>{
         this.orderTest = order ;
      });


  //     .then((res)=>{
  //     console.log(res.child('pipesNo'));
  //     });
  }
  update()
  {
    this.orderTest.pipesNo = 500 ;
    this.orderTest.paymentType = "visa";
    this.orderProvider.updateOrder(this.orderTest)
      .then((order : Order)=>{
        console.log(order.pipesNo);
      });
  }
  delete()
  {
   // console.log(this.orderTest.orderID);
    this.orderProvider.deleteOrder("-KsdDc1Eu-wu36L8bcJ2","D1mgEvVGy5WmSVDgcyobS7OexCo2",User.Customer).then((res)=>{
    //  console.log(res);
      if(res == true)
        console.log('done');
    }).catch((err)=>console.log(err));
  }
  get()
  {
    this.orderProvider.getOrdersByCustomer("D1mgEvVGy5WmSVDgcyobS7OexCo2",Order.NoResponseStatus).then((orders : Order[])=>{
        console.log(orders);
    }).catch((err)=> console.log(err));
  }
  assign()
  {
    this.orderProvider.assignDistributer("-KsdDc1Eu-wu36L8bcJ2","bhjbdhucndsbhu").then((res)=>{
      if(res == true)
      console.log('done');
    }).catch((err)=>console.log(err));
  }
}
