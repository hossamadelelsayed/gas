import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {RegistermemberPage} from "../registermember/registermember";
import {AuthServiceProvider} from'../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import * as firebase from "firebase";

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(private events:Events,private storage:Storage ,private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
this.authService.AnonymousSignIn();
<<<<<<< HEAD
  this.authService.phoneLogin("0100","123456");
//
// let user = firebase.auth().currentUser;
this.events.subscribe('user:created', (user) => {
    // user and time are the same arguments passed in `events.publish(user, time)`
    console.log("llll",user);
  });

=======

// this.userInfo;
// console.log("uuuuuuuuu",this.userInfo.name);
>>>>>>> 4a135866881e16d5958ce149b1a3e30e2c671d57
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
