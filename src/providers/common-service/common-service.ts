import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {

  constructor(public http: Http ,public toastCtrl : ToastController ,
              public translateService : TranslateService ) {
    console.log('Hello CommonServiceProvider Provider');
  }

  presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 1000,
      position: 'middle'
    });
    toast.present();
  }
  successToast()
  {
    this.translateService.get('Success').subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);
      }
    );


  }
  errorToast()
  {
    this.translateService.get('Error').subscribe(
      value => {
        // value is our translated string
        this.presentToast(value);

      }
    );
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
  convertTimestampToDate(timestamp : Date) : Date{
    return new Date(timestamp)
  }

}
