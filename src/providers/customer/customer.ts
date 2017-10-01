import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthServiceProvider} from "../auth-service/auth-service";
import { Storage } from '@ionic/storage';
import * as firebase from "firebase";
import * as GeoFire from "geofire";
declare let google;

/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CustomerProvider {
city:any;
  geoFire: any;

  constructor(public http: Http,public authService : AuthServiceProvider, private storage: Storage) {
    console.log('Hello CustomerProvider Provider');
    //this.authService.doLogin("","");
    let self=this;
    this.storage.get('city').then((city)=>{
      self.city=city;
    });

  }
distTracker(city:any,key:any):Promise<any>{

  let self=this;

    let promise=new Promise((resolve,reject)=>{
if(city!=null&&key!=null) {
  self.markerRef = firebase.database().ref('valid/' + city);


  self.geoFire = new GeoFire(self.markerRef);
//getting latlng using geofire
  self.geoFire.get(key).then(function (location) {
    console.log('updated dist id', location);

    resolve({lat: location[0], lng: location[1]});
    console.log('updated dist id', key);


  }, (error) => {
    console.log("Error: " + error);
  });

}else {
  console.warn('cant track dist city or key not valid',city,key)
}
  });
  return promise;
}
markerRef:any;

}
