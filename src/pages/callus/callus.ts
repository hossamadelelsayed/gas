import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

/**
 * Generated class for the CallusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-callus',
  templateUrl: 'callus.html',
})
export class CallusPage {

  constructor(private emailComposer: EmailComposer,public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
  }
currentEmail:string;
  adminEmail:string='gasforksa@gmail.com';
  msgBody:string;
  msgTitle:string;
  ionViewDidLoad() {
    console.log('ionViewDidLoad CallusPage');


  }
  toggleMenu()
  {
    this.menuCtrl.toggle();
  }
  sendEmail(){
   let self=this;
    let email = {
      to: this.adminEmail,
      // cc: 'erika@mustermann.de',
      // bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [
      //   'file://img/logo.png',
      //   'res://icon.png',
      //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //   'file://README.pdf'
      // ],
      subject: this.msgTitle,
      body: this.msgBody,
      isHtml: true
    };
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        //Now we know we can send
        self.emailComposer.open(email);

      }
    });

  }
}
