import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {RegistermemberPage} from "../registermember/registermember";
import {AuthServiceProvider} from'../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(private events:Events,private storage:Storage ,private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
this.authService.AnonymousSignIn();

// this.userInfo;
// console.log("uuuuuuuuu",this.userInfo.name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
gotohome(){
  this.navCtrl.push(HomePage);
}
gotoreg(){
  this.navCtrl.push(RegistermemberPage);
}
}
