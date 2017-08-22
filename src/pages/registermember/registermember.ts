import { HomePage } from './../home/home';
import { ConfirmPage } from './../confirm/confirm';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{MainPage} from "../main/main";
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import firebase from 'firebase';

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
//registeration
// this.authService.register("heshamsalama1212901022@gmail.com","123456")
// .catch(error =>{
//   console.log("errrr",error);
//
// });
//login
//sign in annonimously
this.authService.doLogin("heshamsalama1212901022@gmail.com","11111111").then(user=>{
let email=this.authService. getLogInEmail("0100");
console.log("email returned using phone",email);
  // this.authService.submitUserInfo("hesham","0100",user.uid,user.email);

  // let rootRef = firebase.database().ref();

// let adaRef = rootRef.child("users/ada").set("kkkk");

//   console.log("user",user.uid);
//    rootRef = firebase.database().ref("hello");
//subscribe to a datasnapshot
// rootRef.once("value")
//   .then(function(snapshot) {
  //   let key = snapshot.key; // null
  //     console.log("errrr",key);
  //
  //   let firstName = snapshot.child("hello2").val(); // "Ada"
  //   console.log("chiled",firstName);
  //
  // });
});
// this.authService.resetPassword("heshamsalama1212901022@gmail.com");

//for logout

// this.authService.doLogout();

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
