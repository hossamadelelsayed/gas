import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
// import {GlobalService} from "../../providers/global-service";
import {Geolocation} from "@ionic-native/geolocation";
import {Subscription, Observable} from "rxjs";
import {CustomerProvider} from "../../providers/customer/customer";
import * as firebase from "firebase";

declare var google: any;

/**
 * Generated class for the TrackingMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracking-map',
  templateUrl: 'tracking-map.html',
})
export class TrackingMapPage {
  // public orderid;
  // public link : SafeResourceUrl;
  // public url;
  public static NavToUserMode : number = 1 ;
  public static NavToDestinationMode : number = 2 ;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  public directionsService :any;
  public directionsDisplay :any;
  public mode : number ;
  public map: any;
  private timer;
  private sub: Subscription;
  private destination_latitude : any ;
  private destination_longitude : any ;
  constructor(public navCtrl: NavController,
              public navParams :NavParams,
private customer:CustomerProvider,
              private geolocation: Geolocation) {
    this.mode = 1;/*1;*/
    this.customer.distTracker("Alexandria Governorate","9QUuOZmIe2gFLFAByrDf2Fo4BEL2")
      .then((loc)=>{
        console.log(loc);
        this.destination_latitude = loc.lat
        this.destination_longitude= loc.lng
        let locationOptions = {  enableHighAccuracy: true };
        this.geolocation.getCurrentPosition().then(
          (position) => {

            console.log( this.destination_latitude);
            this.updateDirection(position.coords.latitude,position.coords.longitude,
              this.destination_latitude,this.destination_longitude);
          },
          (error) => {
            console.log(error);
          }
        );});
  }
  ionViewDidLoad(){
    // if(this.mode == TrackingMapPage.NavToUserMode)
    // {

    // }
    // else if (this.mode == TrackingMapPage.NavToDestinationMode)
    // {
    //   this.destination_latitude = 31.247011;
    //   this.destination_longitude= 29.9697173;
    // }
    console.log('here');
    console.log(this.destination_latitude);
    console.log(this.destination_longitude);
    let RefresherRef=firebase.database().ref("valid/Alexandria Governorate/9QUuOZmIe2gFLFAByrDf2Fo4BEL2");
    RefresherRef.on('value', (snapshot)=> {

      this.customer.distTracker("Alexandria Governorate","9QUuOZmIe2gFLFAByrDf2Fo4BEL2")
        .then((loc)=>{
          this.getPositionAndUpdate(loc);

        });
    });

  }
  ionViewWillEnter()
  {

    this.loadMap();
    this.startNavigating();
    // this.timer = Observable.timer(0, 10000);
    // // subscribing to a observable returns a subscription object
    // this.sub = this.timer.subscribe(t => this.getPositionAndUpdate());
  }
  // ionViewWillLeave()
  // {
  //   this.sub.unsubscribe();
  // }
  loadMap(){
    let latLng = new google.maps.LatLng(this.destination_latitude, this.destination_longitude);

    let mapOptions = {
      center: latLng,
      zoom: 16,
      disableDefaultUI: true,

      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  startNavigating(){
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.directionsPanel.nativeElement);
    // this.getPositionAndUpdate();
  }
  waypts:any=[];
  getPositionAndUpdate(loc:any)
  {

        console.log(loc);
        // this.destination_latitude = loc.lat
        // this.destination_longitude= loc.lng
    let locationOptions = {  enableHighAccuracy: true };
    this.geolocation.getCurrentPosition().then(
      (position) => {
        this.waypts = [];

        this.waypts.push({
          location:{lat: loc.lat, lng:  loc.lng} ,
          stopover: true
        });
        console.log( this.destination_latitude);
        this.updateDirection(position.coords.latitude,position.coords.longitude,
          this.destination_latitude,this.destination_longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateDirection(originLat ,originLng , destinationLat , destinationLng)
  {
    if(destinationLat!=null){
    console.log('update enter yes');
    this.directionsService.route({
      origin:{lat: originLat, lng: originLng},
      destination: {lat: destinationLat, lng: destinationLng},
      waypoints: this.waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {
      if(status == google.maps.DirectionsStatus.OK){
        this.directionsDisplay.setDirections(res);
      } else {
        console.warn(status);
      }
    });}
  }
}
