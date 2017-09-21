import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';



@Component({
  selector: 'page-addvaluation',
  templateUrl: 'addvaluation.html',
})
export class AddvaluationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddvaluationPage');
  }
  toggleMenu()
  {
    this.menuCtrl.toggle();
  }
}
