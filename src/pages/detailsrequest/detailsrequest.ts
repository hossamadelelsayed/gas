import { FollowrequestPage } from './../followrequest/followrequest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HistoryPage} from "../history/history";
import {Order} from "../../models/order";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import {User} from "../../models/user";
import {OrderProvider} from "../../providers/order/order";
import {LaunchNavigator, LaunchNavigatorOptions} from "@ionic-native/launch-navigator";
import {TrackingMapPage} from "../tracking-map/tracking-map";


@Component({
  selector: 'page-detailsrequest',
  templateUrl: 'detailsrequest.html',
})
export class DetailsrequestPage {
  public userClass  =  User ;
  public mode : string ;
  public order : Order ;
  public orderClass  = Order ;
  public user : User ;
  public icons : string[] ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public commonService : CommonServiceProvider , public orderService : OrderProvider ,
              public launchNavigator : LaunchNavigator) {
    this.mode = navParams.data.user ;
    this.order = navParams.data.order ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsrequestPage');
    if(this.mode == User.Customer)
      this.orderService.getDistData(this.order.distributerID).then((dist : User)=>{
          this.user = dist ;
          this.getIcons(this.user.rateInfo.rateSum/this.user.rateInfo.rateNo);
      }).catch((err)=>console.log(err));
    else
      this.orderService.getCustomerData(this.order.customerID).then((cust : User)=>{
        this.user = cust ;
        this.getIcons(this.user.rateInfo.rateSum/this.user.rateInfo.rateNo);
      }).catch((err)=>console.log(err));
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
  distNavigate(){
    let options: LaunchNavigatorOptions = {
      start: '',
    };
    this.launchNavigator.navigate(`${this.order.location.lat},${this.order.location.lng}`, options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }
  navigate(){
    if(this.mode == User.Distributor) {
      this.distNavigate();
    }
    else{
      console.log( this.order)
      console.log( this.order.customerID)
      console.log( this.order.distributerID)
      console.log( this.order.location.lat)
      this.navCtrl.push(TrackingMapPage,{'order':this.order
});
    }
  }
  detailsrequest(){

  }
  getIcons(rate : number)
  {
    this.icons = this.commonService.icons(rate);
  }
}
