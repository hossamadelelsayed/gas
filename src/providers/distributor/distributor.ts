import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import * as GeoFire from "geofire";
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the DistributorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DistributorProvider {
  geoFire: any;
  firebaseRef: any;
id:any;
  constructor(private _http: Http,public geolocation: Geolocation) {
    console.log('Hello DistributorProvider Provider');

  }

  sendMyLoc(lat:any,lng:any){
  ////////////////////////////////////////// listen to the current location and sends it to firebase
   this.getCurrentIpLocation(lat,lng).then((city)=>{
    this. firebaseRef = firebase.database().ref('/valid/'+city);

    this. geoFire = new GeoFire(this.firebaseRef);
    let geo = this.geolocation.getCurrentPosition();

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log('location', data.coords.latitude);
      // this.setLocation("some_key", [ data.coords.latitude,  data.coords.longitude]);
      this.id = firebase.auth().currentUser.uid;

      this.geoFire.set(this.id, [ data.coords.latitude,  data.coords.longitude]).then(()=> {

        console.log("Provided key has been added to GeoFire");
      }, (error)=> {
        console.log("Error: " + error);
      });
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
    ///////////////////////////////////
   });
  }
x:string;
  getCurrentIpLocation(lat:any,lng:any): Promise<any> {

    console.log("latlng",lat,lng);

    let promise = new Promise((resolve, reject )=>{
    this._http.get
    ('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','
      +lng+'&location_type=RANGE_INTERPOLATED&result_type=street_address&'
      +
      'key=AIzaSyBl7DifXZ_qNlyuHVpFzUV9ga8vvIIkteQ')
      .map(response => response.json()
      ).subscribe(data=>{
      console.log("geolocation",data.results[0]. address_components[4].long_name);

      resolve(data);
    });
    });
    return promise;
  }
}
