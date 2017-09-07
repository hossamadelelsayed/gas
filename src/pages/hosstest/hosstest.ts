import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {OrderProvider} from "../../providers/order/order";
import {Order} from "../../models/order";
import {Location} from "../../models/location";

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

  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public orderService : OrderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HosstestPage');
  }
  create()
  {
    this.orderService.login().then((customer)=>{
      this.orderService.createOrder(new Order(customer.uid ,5,new Location(565414.54,561412.48,'my home'),'cash')).then((res)=>{
        console.log(res);
      }).catch((err)=>console.log(err));
    }).catch((err)=>console.log(err));
  }
  update()
  {

  }
  delete()
  {

  }
  assign()
  {

  }
  get()
  {

  }
}
