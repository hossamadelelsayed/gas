import { FollowrequestPage } from './../followrequest/followrequest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HistoryPage} from "../history/history";


@Component({
  selector: 'page-detailsrequest',
  templateUrl: 'detailsrequest.html',
})
export class DetailsrequestPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsrequestPage');
  }
gotohistory(){
  this.navCtrl.push(HistoryPage);
}
gotoflloerequest(){
  this.navCtrl.push(FollowrequestPage);
}
}
