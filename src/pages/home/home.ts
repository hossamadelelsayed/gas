import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';
import{MainPage} from "../main/main";
import { ForgotpasswordPage } from './../forgotpassword/forgotpassword';
import { RegistermemberPage } from './../registermember/registermember';
import firebase from 'firebase';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
phoneNo :any;
  constructor(private authService:AuthServiceProvider,public events: Events,public navCtrl: NavController) {

  }

gotocreateorder(){
  this.authService.AnonymousSignIn();
  let    rootRef = firebase.database().ref("0100");
// subscribe to a datasnapshot
let self = this ;
rootRef.once("value")
  .then(function(snapshot) {
    let key = snapshot.key; // phoneNo
      console.log("phoneNo",key);

      self.events.publish('user:created', "email", Date.now());

    let email = snapshot.val(); // email

    console.log("chiled",email);

  });
//   this.events.subscribe('logInPhone', (email) => {
//   // user and time are the same arguments passed in `events.publish(user, time)`
//   console.log('Welcome', email);
//   this.navCtrl.push(MainPage);
//
// });
}
gotoforgotpassword(){
this.navCtrl.push(ForgotpasswordPage);
}
gotoreg(){
this.navCtrl.push(RegistermemberPage);
}
}
