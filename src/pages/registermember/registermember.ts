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
     // this.authService.doLogin("heshamsalama1212901022@gmail.com","123456").catch(error =>{
    //   console.log("login error",error);
    // });

//registeration
this.authService.AnonymousSignIn();
this.authService.register("heshamsalama1212901022@gmail.com","123456","hesham","0100")
.catch(error =>{
  console.log("registeration error",error);
});
// this.authService.userTransfere("heshamsalama1212901022@gmail.com","123456");

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
