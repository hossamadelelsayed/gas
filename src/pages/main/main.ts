import { SelectagentPage } from './../selectagent/selectagent';
import { CreateorderPage } from './../createorder/createorder';
import {OrderlaterPage} from "../orderlater/orderlater";
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from "firebase";
import * as GeoFire from "geofire";

import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


/**
 * Generated class for the MainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 declare let google;

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  @ViewChild('map') mapElement: ElementRef;
   map: any;

  firebaseRef: any;
  geoFire: any;
  marker:any;
  markerRef:any;
  myLatLng:any;
  hits = new BehaviorSubject([])
  constructor(public geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams,
              public menuCtrl: MenuController ) {
/// Reference database location for GeoFire


  }


  gotoorderlater(){
    this.navCtrl.push(OrderlaterPage);
    }


  ionViewDidLoad(){
    let self=this;


    ////////
    this. firebaseRef = firebase.database().ref('/locations');
 this.markerRef=firebase.database().ref('/locations/some_key');
// Create a GeoFire index
    this. geoFire = new GeoFire(this.firebaseRef);

    this.geolocation.getCurrentPosition().then((resp) => {
      // this.loadMap();
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        self. marker = new google.maps.Marker({
        position:latLng,
        map: self.map,
        title: 'Hello World!'
    });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
///////////////////////////////get firebase distributors locs
    this.markerRef.on("value"
      , (snapshot)=> {
        this.geoFire.get("some_key").then((location)=> {

          if (location === null) {
            console.log("Provided key is not in GeoFire");
          }
          else {
            try{
self.myLatLng ={lat:location[0],lng:location[1]};
              let latlng = new google.maps.LatLng(location[0],location[1]);
              self. marker.setPosition(latlng);
              console.log("location changed to : ",location);

            }catch (E){ console.log("Provided key has a location of " ,E);}
          }
        }, (error)=> {
          console.log("Error: " + error);
        });
      });
/////////////
    console.log("location of " +  self.myLatLng);

//////////////////////////////////////////// listen to the current location and sends it to firebase
//     let watch = this.geolocation.watchPosition();
//     watch.subscribe((data) => {
//       console.log('location', data.coords.latitude);
//       this.current= data.coords.latitude;
//       // this.setLocation("some_key", [ data.coords.latitude,  data.coords.longitude]);
//       this.geoFire.set("some_key", [ data.coords.latitude,  data.coords.longitude]).then(()=> {
//
//         console.log("Provided key has been added to GeoFire");
//       }, (error)=> {
//         console.log("Error: " + error);
//       });
//       // data can be a set of coordinates, or an error (if an error occurred).
//       // data.coords.latitude
//       // data.coords.longitude
//     });
    /////////////////////////////////////
   }
  /// Adds GeoFire data to database
  // setLocation(key:string, coords: Array<number>):Promise <any> {
  //   let promise=new Promise(resolve,reject)
  //   this.geoFire.set(key, coords)
  //     .then(_ => console.log('location updated'))
  //     .catch(err => console.log(err))
  //   return promise;
  // }

gotocreatorder(){
// Create a Firebase reference where GeoFire will store its information
this.navCtrl.push(CreateorderPage);

}
current:any;
toggleMenu()
  {
    this.menuCtrl.toggle();
  }

  
}
