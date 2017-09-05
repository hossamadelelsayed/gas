import { AddvaluationPage } from './../addvaluation/addvaluation';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';

/**
 * Generated class for the FollowrequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-followrequest',
  templateUrl: 'followrequest.html',
})
export class FollowrequestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowrequestPage');
  }
gotoaddvaluation(){
  this.navCtrl.push(AddvaluationPage);
}
toggleMenu()
{
  this.menuCtrl.toggle();
}
}
