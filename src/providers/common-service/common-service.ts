import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController, AlertController, NavController, LoadingController, Loading} from "ionic-angular";
import {TranslateService} from "@ngx-translate/core";
import {Order} from "../../models/order";
import {DetailsrequestPage} from "../../pages/detailsrequest/detailsrequest";

/*
  Generated class for the CommonServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CommonServiceProvider {

  public loader : Loading;
  constructor(public http: Http ,public toastCtrl : ToastController ,
              public translateService : TranslateService , public alertCtrl : AlertController ,
              public loadingCtrl : LoadingController) {
    console.log('Hello CommonServiceProvider Provider');
  }

  presentLoading(txt:string) {
    this.loader = this.loadingCtrl.create({
      content: txt
    });
    this.loader.present();
  }
  dismissLoading(){
    this.loader.dismiss();
  };
  presentToast(txt:string) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 1000,
      position: 'bottom'
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
