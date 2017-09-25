import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Rate} from "../../models/rate";
import * as firebase from "firebase";
import {RateInfo} from "../../models/rateInfo";
import {User} from "../../models/user";

/*
  Generated class for the RateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RateProvider {
  public fireDatabase : any;
  public fireAuth : any;
  constructor(public http: Http) {
    console.log('Hello RateProvider Provider');
    this.fireAuth = firebase.auth();
    this.fireDatabase = firebase.database();
  }
  rate(rate : Rate, rateType : string) : Promise <boolean>
  {
    let ratePath : string ;
    if(rateType == Rate.rateCustomerType)
      ratePath = '/customerRate/'+rate.customerID ;
    else ratePath = '/distRate/'+rate.distributorID;
    let promise = new Promise((resolve, reject) => {
      let rateRef = this.fireDatabase.ref(ratePath);
      rateRef.push(rate).then((snapshot:any)=>{
        let rateInstanceRef = this.fireDatabase.ref(ratePath+'/'+snapshot.key);
        rateInstanceRef.child('rateID').set(snapshot.key).then(()=>{
          this.calculateRate(rate,rateType).then(()=>resolve(true)).catch((err)=>reject(err))
        }).catch((err)=>reject(err));
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
  calculateRate(rate : Rate, rateType : string) : Promise <boolean>
  {
      let userPath : string ;
      if(rateType == Rate.rateCustomerType)
        userPath = '/customers/'+rate.customerID;
      else userPath = '/distributors/'+rate.distributorID;
      let promise = new Promise((resolve, reject) => {
        let userRef = this.fireDatabase.ref(userPath);
        userRef.once('value').then((snapshot:any)=>{
          let user : User = snapshot.val();
          if(user.rateInfo != null){
            user.rateInfo.rateNo++;
            user.rateInfo.rateSum += rate.rateVal ;
            userRef.child('rateInfo').set(user.rateInfo).then(()=>resolve(true)).catch((err)=>reject(err));
          }
          else
            userRef.child('rateInfo').set(new RateInfo(rate.rateVal)).then(()=>resolve(true)).catch((err)=>reject(err));
        }).catch((err)=>reject(err));
      });
      return promise ;
  }


}
