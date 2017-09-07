import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-editaccountdis',
  templateUrl: 'editaccountdis.html',
})
export class EditaccountdisPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditaccountdisPage');
  }

}
