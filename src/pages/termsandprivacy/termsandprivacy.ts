import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AboutusProvider } from '../../providers/aboutus/aboutus';

@Component({
  selector: 'page-termsandprivacy',
  templateUrl: 'termsandprivacy.html',
})
export class TermsandprivacyPage {
  public Info : any ;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,public about:AboutusProvider) {
    this.about.arTermsAndConditions();
    this.about.enTermsAndConditions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsandprivacyPage');
    this.InfoGas();
  }
InfoGas(){
  this.storage.get('lang').then((res)=>{
    if(res=='en'){
        this.about.enGetTermsAndConditions().then((res)=>{
        this.Info=res.paragraph;
        console.log(res);
      });
    }
    else{
      this.about.arGetTermsAndConditions().then((res)=>{
        this.Info=res.paragraph;
      console.log(res);
      });
    }
    });
    }
}
