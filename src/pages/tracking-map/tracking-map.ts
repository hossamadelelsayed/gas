import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
// import {GlobalService} from "../../providers/global-service";
import {Geolocation} from "@ionic-native/geolocation";
import {Subscription, Observable} from "rxjs";
import {CustomerProvider} from "../../providers/customer/customer";
import * as firebase from "firebase";
import * as GeoFire from "geofire";
import {CommonServiceProvider} from "../../providers/common-service/common-service";

declare var google: any;

/**
 * Generated class for the TrackingMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tracking-map',
  templateUrl: 'tracking-map.html',
})
export class TrackingMapPage {
  // public orderid;
  // public link : SafeResourceUrl;
  // public url;
  // public static NavToUserMode : number = 1 ;
  // public static NavToDestinationMode : number = 2 ;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  public directionsService :any;
  public directionsDisplay :any;
  public map: any;
  private destination_latitude : any ;
  private destination_longitude : any ;
  private oregin_latitude : any ;
  private oregin_longitude : any ;
  constructor(public navCtrl: NavController,
              public navParams :NavParams,public commonService:CommonServiceProvider,
private customer:CustomerProvider,
              private geolocation: Geolocation) {

  }
  loadMap(){
    let latLng = new google.maps.LatLng(this.destination_latitude, this.destination_longitude);

    let mapOptions = {
      center: latLng,
      zoom: 16,
      disableDefaultUI: true,

      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  order:any;
  ionViewWillEnter()
  {

    this.loadMap();
    this.startNavigating();

    // destination: customer location from the order object
    // way points: valid dist loc changing on line map

this.order=this.navParams.get('order')
    this.key=this.order.distributerID;

      console.log('oregin dist id '+`${this.key.distributerID}`)
      // oregin: dist loc when accepts

      this.customer.distTracker("Alexandria Governorate",this.key)
        .then((loc)=>{
          console.log(loc);
          //dist loc
          this.oregin_latitude = loc.lat
          this.oregin_longitude= loc.lng
          //customer loc
          this.destination_latitude=this.order.location.lat
          this.destination_longitude=this.order.location.lng
          // let locationOptions = {  enableHighAccuracy: true };


          console.log( this.destination_latitude);

          this.updateDirection(this.oregin_latitude,this.oregin_longitude,
            this.destination_latitude,this.destination_longitude);

        });

  }
  key:any;
  ionViewDidLoad(){
    this.order=this.navParams.get('order')

    this.key=this.order.distributerID;

    console.log('RefresherRef key',this.key)
    //updateing waypoints when dist moves
    let RefresherRef=firebase.database().ref("valid/Alexandria Governorate/"+this.key);
    RefresherRef.on('value', (snapshot)=> {

      this.customer.distTracker("Alexandria Governorate",this.key)
        .then((loc)=>{
          this.getPositionAndUpdate(loc);

        });
    });

  }

  // ionViewWillLeave()
  // {
  //   this.sub.unsubscribe();
  // }

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
    this.waypts = [];
////check for the loc of dist and order loc
    var currentDistLoc = [loc.lat, loc.lng];
    var customerLoc = [ this.destination_latitude,this.destination_longitude];
    console.log('total distance',currentDistLoc, customerLoc)

    var distance = GeoFire.distance(customerLoc,currentDistLoc).toFixed(2);
    if(distance<=0.10) {
this.commonService.presentConfirm('wait till you get your pipe delevered','i didnet recive my order','i recived my order',this.orderIsDone());
    }
    console.log('total distance',distance)
    this.waypts.push({
          location:{lat: loc.lat, lng:  loc.lng} ,
          stopover: true
        });
    console.log(this.waypts);

    console.log( 'dist is movieng to ',loc);

        this.updateDirection(this.oregin_longitude,this.oregin_longitude,
          this.destination_latitude,this.destination_longitude);

  }
  updateDirection(originLat ,originLng , destinationLat , destinationLng)
  {
    if(destinationLat!=null){
    console.log('update entered yes');
    this.directionsService.route({
      //
      origin  :{lat: originLat, lng: originLng},
      destination   : {lat: destinationLat, lng: destinationLng},
      waypoints: this.waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode['DRIVING']
    }, (res, status) => {
      if(status == google.maps.DirectionsStatus.OK){
        this.directionsDisplay.setDirections(res);
      }
      else {
        console.warn(status);
      }
    });}
  }
  orderIsDone():Promise<any>{
    let promise=new Promise((resolve,reject)=>{
      console.log('order delivered')

    });
  return promise
  }
}
