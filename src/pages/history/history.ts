import { DetailsrequestPage } from './../detailsrequest/detailsrequest';
import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }
gotodetailsrequest(){
  this.navCtrl.push(DetailsrequestPage);
}
toggleMenu()
{
  this.menuCtrl.toggle();
}
}
