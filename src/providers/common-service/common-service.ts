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
  public readonly maxRate: number = 5;
  public iconEmpty: string = 'star-outline';
  public iconFull: string = 'star';
  public readonly  SortASC = 'asc' ;
  public readonly SortDESC = 'desc' ;
  constructor(public http: Http ,public toastCtrl : ToastController ,
              public translateService : TranslateService , public alertCtrl : AlertController ,
              public loadingCtrl : LoadingController) {
    console.log('Hello CommonServiceProvider Provider');
  }
  errPresentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      showCloseButton:true,
      closeButtonText:"ok",
      position: 'top'
    });
    toast.present();

  }
  presentLoading(txt:string) {
    this.loader = this.loadingCtrl.create({
      content: txt
    });
    this.loader.present();
  }
<<<<<<< HEAD
  dismissLoading(){
    this.loader.dismiss();
=======
  dismissLoading(check:boolean){
    if(check){
    this.loader.dismiss();}
>>>>>>> ff8edbadb769e22c9f87933fe460f88d15b23a2a
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
  // Rate Service
  public icons(rate : number): string[] {
    let icons = [];
    for (let i = 1; i <= this.maxRate; i++) {
      if (i <= rate) {
        icons.push(this.iconFull);
      }
      else {
        icons.push(this.iconEmpty);
      }
    }
    return icons;
  }





  presentConfirm(msg:string,cancelTxt:string,confirmTxt:string, x :Promise<any>) {
    let alert = this.alertCtrl.create({
     // title: 'غاز السعودية',
      message: msg,
      buttons: [
        {
          text: cancelTxt,
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: confirmTxt,
          handler: () => {
            x.then(()=>{
              console.log('confirmed');
            });
          }
        }
      ]
    });
    alert.present();
  }



  sortArray(array : any[] , key , sortType : string){
    if(sortType == this.SortDESC)
      array.sort((a ,b )=> {
        if (new Date(a[key]) <= new Date(b[key]))
          return 1;
      });
    else
      array.sort((a ,b)=> {
        if (new Date(a[key]) > new Date(b[key]))
          return 1;
      });
  }
}
