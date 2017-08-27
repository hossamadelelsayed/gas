import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{AddcardPage} from "../addcard/addcard";

@Component({
  selector: 'page-orderlater',
  templateUrl: 'orderlater.html',
})
export class OrderlaterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderlaterPage');
  }
gotoaddcard(){this.navCtrl.push(AddcardPage);}
}
