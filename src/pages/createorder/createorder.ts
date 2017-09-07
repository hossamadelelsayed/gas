import { HistoryPage } from './../history/history';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import {OrderlaterPage} from "../orderlater/orderlater";
import{AddcardPage} from "../addcard/addcard";
@Component({
  selector: 'page-createorder',
  templateUrl: 'createorder.html',
})
export class CreateorderPage {
 counter:number=1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController ) {
  }
  add(){
    this.counter++;
  }
  minus(){
    this.counter--; 
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
gotoaddcard(){this.navCtrl.push(AddcardPage);}
toggleMenu()
{
  this.menuCtrl.toggle();
}

createOrderNow(){
  
}

}
