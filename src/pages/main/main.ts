import { SelectagentPage } from './../selectagent/selectagent';
import { CreateorderPage } from './../createorder/createorder';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }
gotocreatorder(){
  this.navCtrl.push(CreateorderPage);
}
gotoselrct(){
  this.navCtrl.push(SelectagentPage);
}
}
