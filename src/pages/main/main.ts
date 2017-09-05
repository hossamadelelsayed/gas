import { SelectagentPage } from './../selectagent/selectagent';
import { CreateorderPage } from './../createorder/createorder';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController} from 'ionic-angular';



@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController ) {
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
toggleMenu()
  {
    this.menuCtrl.toggle();
  }
 
}
