import { Component } from '@angular/core';
import { Platform,NavController, NavParams, IonicPage,MenuController } from 'ionic-angular';
import { ViewChild, ElementRef } from '@angular/core';
import * as firebase from "firebase";
import * as GeoFire from "geofire";
import { Geolocation } from '@ionic-native/geolocation';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {CustomerLocationProvider} from "../../providers/customer/customerLocation"
import {Location} from '../../models/location';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

declare var google;
@Component({
  selector: 'page-orderlocation',
  templateUrl: 'orderlocation.html',
})
export class OrderlocationPage {
  @ViewChild('map') mapElement: ElementRef;
   public map: any;
   public markers =[];
   public location:Location;
   public lat : number;
   public lng : number;
   public placelabel:string;
   public customerid : string;
  constructor( private authService:AuthServiceProvider,public cutomerLocation:CustomerLocationProvider,public platform:Platform,public geolocation: Geolocation,public navCtrl: NavController, public navParams: NavParams)
  {
    platform.ready().then(() => {
      this.loadMap();
    });
  }
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
        let mapOptions = {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      google.maps.event.addListener(this.map, 'click', (event) => {
       this.setMapOnAll(null);
        var location  = event.latLng;
        this.lat = location.lat();
        this.lng = location.lng();
        console.log(this.lat);
        console.log(this.lng);
        this.addMarker(location);
      });
      this.addMarker(this.map.getCenter());
    
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  addMarker(LatLng){
    let marker  = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: LatLng
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  sendLocation(){
   this.location = new Location (this.lat,this.lng,this.placelabel);
   console.log(this.location.lat,this.location.lng,this.location.label);
 
   this.customerid = this.authService.getUserId();
   this.cutomerLocation.createLocation(this.customerid,this.location).then((res)=>{
    console.log(res);
    this.navCtrl.pop();
   }).catch((err)=>{
     console.log("error in saving");
  });
  }
}
