import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{MainPage} from "../main/main";
import{ForgotpasswordPage} from "../forgotpassword/forgotpassword";
import {RegistermemberPage} from "../registermember/registermember";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
gotocreateorder(){
this.navCtrl.push(MainPage);
}
gotoforgotpassword(){
this.navCtrl.push(ForgotpasswordPage);
}
gotoreg(){
this.navCtrl.push(RegistermemberPage);
}
}
