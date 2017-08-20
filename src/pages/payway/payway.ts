import { AddcardPage } from './../addcard/addcard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaywayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-payway',
  templateUrl: 'payway.html',
})
export class PaywayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaywayPage');
  }
gotoaddcard(){
  this.navCtrl.push(AddcardPage);
}
}
