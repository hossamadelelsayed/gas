import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DistHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dist-history',
  templateUrl: 'dist-history.html',
})
export class DistHistoryPage {
   public showing : string = 'current' ;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DistHistoryPage');
  }

}
