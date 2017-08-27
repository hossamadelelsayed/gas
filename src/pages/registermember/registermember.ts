import { HomePage } from './../home/home';
import { ConfirmPage } from './../confirm/confirm';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{MainPage} from "../main/main";
/**
 * Generated class for the RegistermemberPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-registermember',
  templateUrl: 'registermember.html',
})
export class RegistermemberPage {

  constructor(private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistermemberPage');
  }
gotoconfirm(){
  this.navCtrl.push(ConfirmPage);
}
gotohome(){
  this.navCtrl.push(HomePage);
}
gotocreateorder(){
this.navCtrl.push(MainPage);
}
}
