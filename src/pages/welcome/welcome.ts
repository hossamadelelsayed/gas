import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {RegistermemberPage} from "../registermember/registermember";
import {AuthServiceProvider} from'../../providers/auth-service/auth-service';
import { UserInfoProvider } from '../../providers/user-info/user-info';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(private storage:Storage ,private userInfo:UserInfoProvider,private authService:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams) {

 this.authService.doLogin("heshamsalama1212901022@gmail.com","123456").then(data=>{
  //  console.log("login returns name",data.name);
this.userInfo.getName();
  console.log("data",data);
  storage.get('name').then((val) => {
     console.log('name',this.userInfo.getName()
);
   });

 });
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
