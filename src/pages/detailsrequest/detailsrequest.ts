import { FollowrequestPage } from './../followrequest/followrequest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HistoryPage} from "../history/history";
import {Order} from "../../models/order";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {User} from "../../models/user";


@Component({
  selector: 'page-detailsrequest',
  templateUrl: 'detailsrequest.html',
})
export class DetailsrequestPage {
  public user : User =  User ;
  public mode : string ;
  public order : Order ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public commonService : CommonServiceProvider) {
    this.mode = navParams.data.user ;
    this.order = navParams.data.order ;
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
  convertDate(timestamp : Date) : Date {
    return this.commonService.convertTimestampToDate(timestamp);
  }
}
