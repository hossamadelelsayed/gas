import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import * as GeoFire from "geofire";
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from "rxjs/Observable";
// import {google} from "../../pages/main/main";
// import {google} from "../../pages/main/main";

/*
  Generated class for the DistributorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DistributorProvider {
  geoFire: any;
  firebaseRef: any;
  city:string;
id:any;
  constructor(private _http: Http,public geolocation: Geolocation) {
    console.log('Hello DistributorProvider Provider');

  }

  sendMyLoc(lat:any,lng:any){
  ////////////////////////////////////////// listen to the current location and sends it to firebase
   this.getCurrentIpLocation(lat,lng).then((city)=>{
    this. firebaseRef = firebase.database().ref('/valid/'+city);
this.city=city;
    this. geoFire = new GeoFire(this.firebaseRef);
    let geo = this.geolocation.getCurrentPosition();

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log('location', data.coords.latitude);
      // this.setLocation("some_key", [ data.coords.latitude,  data.coords.longitude]);
      this.id = firebase.auth().currentUser.uid;
      console.log("geo id",this.id);

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
      // console.log("geolocation",data.results[0]. address_components[4].short_name);
      console.log("geolocation result",data);
if(data.status!= "ZERO_RESULTS"){
      resolve(data.results[0]. address_components[4].short_name);
}
resolve('Alexandria Governorate');
    });
    });
    return promise;
  }
//   getDistributors(myLatLng:any,markerRef:any,marker){
//     ///////////////////////////////get firebase distributors locs
//     markerRef.on("value"
//       , (snapshot)=> {
//         this.geoFire.get("some_key").then((location)=> {
//
//           if (location === null) {
//             console.log("Provided key is not in GeoFire");
//           }
//           else {
//             try{
// myLatLng ={lat:location[0],lng:location[1]};
//               let latlng = new google.maps.LatLng(location[0],location[1]);
//               marker.setPosition(latlng);
//               console.log("location changed to : ",location);
//
//             }catch (E){ console.log("Provided key has a location of " ,E);}
//           }
//         }, (error)=> {
//           console.log("Error: " + error);
//         });
//       });
// /////////////
//   }
  onDistributorDisconnect(){
    this.id = firebase.auth().currentUser.uid;
   let firebaseRef = firebase.database().ref('/valid/'+this.city+"/"+this.id);
   firebaseRef.once('value').then(snapshot=>{
     firebaseRef.remove();
   });

  }

  getDistributorsName(id:any):Promise<string>{
    let promise=new Promise((resolve,reject)=>{
      let firebaseRef = firebase.database().ref('distributors/'+id+"/name");
      firebaseRef.once(('value'),(snapshot)=>{
        snapshot.val();
      resolve(snapshot.val());
      });
    });


    return promise;
  }
  getDistributorsPhone(id:any):Promise<string>{
    let promise=new Promise((resolve,reject)=>{
      let firebaseRef = firebase.database().ref('distributors/'+id+"/phoneNo");
      firebaseRef.once(('value'),(snapshot)=>{
        snapshot.val();
        resolve(snapshot.val());
      });
    });


    return promise;
  }
  getDistributorPhone(key:any):Promise<any>{
    let promise=new Promise((resolve,reject)=>{


    this.getDistributorsPhone(key).then((phone)=>{
    //   this.distPhone=name;
      console.log('phone',phone);
      resolve(phone);
      
              });

    });
    return promise;
    }
    getDistributorName(key:any):Promise<any>{
      let promise=new Promise((resolve,reject)=>{


    
      this.getDistributorsName(key).then((name)=>{
          // this.distName=name;
          console.log('name',name);
resolve(name);

      });


  });
  return promise ;
  }
}
