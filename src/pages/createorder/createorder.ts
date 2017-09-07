import { HistoryPage } from './../history/history';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,ToastController } from 'ionic-angular';
import {OrderlaterPage} from "../orderlater/orderlater";
import {AddcardPage} from "../addcard/addcard";
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {OrderProvider} from '../../providers/order/order';
import {Location} from '../../models/location';
import {Order}from '../../models/order';
import {TranslateService} from "@ngx-translate/core";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'page-createorder',
  templateUrl: 'createorder.html',
})
export class CreateorderPage {
 counter:number=1;
 public userId : string;
 public deliveryDate : any = Date.now();
 public sameDate : boolean = false;
constructor(
            public toastCtrl : ToastController,
            public translateService :TranslateService , 
            public auth :AuthServiceProvider,
            public order: OrderProvider,
            public navCtrl: NavController, 
            public navParams: NavParams, 
            public menuCtrl: MenuController) {

   this.userId = this.auth.getUserId();
}
add(){
  this.counter++;
}
minus(){
  this.counter--; 
}

sameChange()
{
  this.sameDate = true;
}
ionViewDidLoad() {
  console.log('ionViewDidLoad CreateorderPage');
}
gotohistory(){
  this.navCtrl.push(HistoryPage);
}
gotoorderlater(){
this.navCtrl.push(OrderlaterPage);
}
gotoaddcard(){
  this.navCtrl.push(AddcardPage);
}
toggleMenu()
{
  this.menuCtrl.toggle();
}

createOrderNow(){
  console.log(this.deliveryDate);
  this.order.createOrder(new Order
    (this.userId,this.counter,new Location(31.03245632,29.2632238,'hello work'),"cash",this.deliveryDate,this.sameDate))
      .then((Order)=>{
        console.log(Order.deliveryDate);
        console.log(Order.customerID);
        console.log(Order.monthly);
        this.translateAndToast('Order Done');})
      .catch((err)=>{
        console.log(err.message);
      });
}
presentToast(txt:any) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  
  translateAndToast(word : string)
  {
    this.translateService.get(word).subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);
      }
    );
  }
}
