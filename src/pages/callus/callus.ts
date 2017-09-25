import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import {TranslateService} from "@ngx-translate/core";
import { ToastController } from 'ionic-angular';
import {CommonServiceProvider} from "../../providers/common-service/common-service";
@Component({
  selector: 'page-callus',
  templateUrl: 'callus.html',
})
export class CallusPage {

  constructor(private emailComposer: EmailComposer,
              public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              private toastCtrl: ToastController,public commonService:CommonServiceProvider,
              public translateService : TranslateService) {
                this.emailComposer.isAvailable().then((available: boolean) =>{
                  if(available) {
                    //Now we know we can send

                  }
                });
              }
public onclick:boolean = true;
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
   try {
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
     // this.translateAndToast("Your message has been sent.");

     self.emailComposer.open(email);
   }catch (E){
     // this.commonService.errPresentToast("E :"+E)
     // this.translateAndToast('error :'+E);

   }

    this.onclick = false;

  }
  presentToast(text:any) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
  toast.present();
  }
   translateAndToast(word : string)
    {
      this.translateService.get(word).subscribe(
        value => {
          // value is our translated string
          this.presentToast(value);
        }
      );
    }
}
