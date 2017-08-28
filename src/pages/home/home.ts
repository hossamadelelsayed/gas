import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{MainPage} from "../main/main";
import{ForgotpasswordPage} from "../forgotpassword/forgotpassword";
import {RegistermemberPage} from "../registermember/registermember";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public mobile:any;
public password:any;
  constructor(public navCtrl: NavController,private auth:AuthServiceProvider) {

  }

gotocreateorder(){
// this.navCtrl.push(MainPage);
this.auth.phoneLogin('0100','123456');
}
gotoforgotpassword(){
this.navCtrl.push(ForgotpasswordPage);
}
gotoreg(){
this.navCtrl.push(RegistermemberPage);
}
}
