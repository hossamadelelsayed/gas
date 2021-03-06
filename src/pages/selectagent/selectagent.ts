import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController} from 'ionic-angular';

/**
 * Generated class for the SelectagentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-selectagent',
  templateUrl: 'selectagent.html',
})
export class SelectagentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectagentPage');
  }
  toggleMenu()
  {
    this.menuCtrl.toggle();
  }
}
