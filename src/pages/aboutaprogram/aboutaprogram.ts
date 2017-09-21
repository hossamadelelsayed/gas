import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutusProvider } from '../../providers/aboutus/aboutus';
import {MainService} from "../../providers/main-service";
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-aboutaprogram',
  templateUrl: 'aboutaprogram.html',
})
export class AboutaprogramPage {
  public aboutInfo : any ;

  public MainService : MainService = MainService ;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,public about:AboutusProvider,  private storage: Storage) {
      this.about.arAboutUs();
      this.about.enAboutUs();
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutaprogramPage');
    this.aboutGas();
  }
  aboutGas(){
    this.storage.get('lang').then((res)=>{
if(res=='en'){
    this.about.enGetAboutUs().then((res)=>{
    this.aboutInfo=res.paragraph;
    console.log(res);
  });
}
else{
  this.about.arGetAboutUs().then((res)=>{
    this.aboutInfo=res.paragraph;
  console.log(res);
  });
}
});
}
}
