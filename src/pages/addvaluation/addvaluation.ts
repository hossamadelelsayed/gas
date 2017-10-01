import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { NavController, NavParams,MenuController } from 'ionic-angular';
import {Order} from "../../models/order";
import {OrderProvider} from "../../providers/order/order";
import {User} from "../../models/user";
import {Rate} from "../../models/rate";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {RateInfo} from "../../models/rateInfo";
import {RateProvider} from "../../providers/rate/rate";



@Component({
  selector: 'page-addvaluation',
  templateUrl: 'addvaluation.html',
})
export class AddvaluationPage {

  public order : Order ;
  public mode : string ;
  // public user : User ;
  public rateClass = Rate ;
  public rateNo : number = 0 ;
  public icons : string[] ;
  public comment : string  = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl: MenuController,
              public orderService : OrderProvider , public commonService : CommonServiceProvider ,
              public rateService : RateProvider) {
    this.order = navParams.data.order ;
    this.mode  = navParams.data.mode ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddvaluationPage');
    this.getIcons(0);
    // if(this.mode == Rate.rateCustomerType)
    //   this.orderService.getCustomerData(this.order.customerID).then((cust : User)=>this.user = cust).catch((err)=>console.log(err));
    // else
    //   this.orderService.getDistData(this.order.distributerID).then((dist : User)=>this.user = dist ).catch((err)=>console.log(err));
  }
  getIcons(rate : number)
  {
     this.icons = this.commonService.icons(rate);
  }
  customerRate(rateNo : number){
    this.rateNo = rateNo ;
    this.getIcons(rateNo);
    // this.commonService.successToast();
  }
  rateConfirm(){
    let rate : Rate = new Rate(
      this.order.customerID ,
      this.order.distributerID ,
      this.order.orderID ,
      this.rateNo ,
      this.comment  ) ;
    this.rateService.rate(rate,this.mode).then(()=>{
      this.commonService.successToast();
      this.navCtrl.pop();
    }).catch((err)=>console.log(err))
  }
  toggleMenu()
  {
    this.menuCtrl.toggle();
  }
}
