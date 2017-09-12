import { DetailsrequestPage } from './../detailsrequest/detailsrequest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import {OrderProvider} from "../../providers/order/order";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(public auth:AuthServiceProvider,public order:OrderProvider,public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
gotodetailsrequest(){
  this.navCtrl.push(DetailsrequestPage);
}
toggleMenu()
{
  this.menuCtrl.toggle();
}

listOrders(){
  //this.order.getOrdersByCustomer()
}

}
