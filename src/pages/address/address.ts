import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController,ViewController } from 'ionic-angular';
import { OrderlocationPage} from '../orderlocation/orderlocation';
import {CustomerLocationProvider} from "../../providers/customer/customerLocation"
import {Location} from '../../models/location';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the AddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {
  public customerid : string;
  public locations : any;
  constructor(public viewCtrl : ViewController , public customerLocation:CustomerLocationProvider,public auth:AuthServiceProvider,public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
          
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }
  ionViewWillEnter(){
    this.listLocations();
  }
  toggleMenu()
  {
    this.menuCtrl.toggle();
  }

  showMap(){
    this.navCtrl.push(OrderlocationPage);
  }

  listLocations(){
    let self = this;
    this.customerid = this.auth.getUserId();
    this.customerLocation.getLocations(this.customerid).then((res)=>{
        this.locations = res;
        console.log(res);
        console.log(this.locations);
    }).catch((err)=>{
      console.log("Errrorr");
    });
  }

  selectLocation(location : Location)
  {  
      this.viewCtrl.dismiss(location);
      
     
  }
}
