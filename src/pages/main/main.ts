import { SelectagentPage } from './../selectagent/selectagent';
import { CreateorderPage } from './../createorder/createorder';
import {OrderlaterPage} from "../orderlater/orderlater";
import {Component, ViewChild, ElementRef, NgZone} from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from "firebase";
import * as GeoFire from "geofire";
import {DistributorProvider} from'../../providers/distributor/distributor';

import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AuthServiceProvider} from "../../providers/auth-service/auth-service";
import {Marker} from "@ionic-native/google-maps";
import { SMS } from '@ionic-native/sms';
import { CallNumber } from '@ionic-native/call-number';
import {Subscription} from "rxjs/Subscription";
import { Storage } from '@ionic/storage';
import {OrderProvider} from "../../providers/order/order";
import {CommonServiceProvider} from "../../providers/common-service/common-service";
import { PushNotificationsProvider } from '../../providers/push-notifications/push-notifications';

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
    map: any;
    markers : any[] = [];
    markersTags : any[] = [];
    distName:any;
    distPhone:any;
    starsArray:any[];
    starsNo:any;
  // private sub: Subscription;

  @ViewChild('map') mapElement: ElementRef;

    firebaseRef: any;
    geoFire: any;
    marker:any;
    markerRef:any=firebase.database().ref();
    myLatLng:any;
    smsMessage:any;
    disId:string;
    hits = new BehaviorSubject([])
    constructor(private callNumber: CallNumber,private sms: SMS
                ,public geolocation: Geolocation,
                public navCtrl: NavController,
                public navParams: NavParams,
                public commonService:CommonServiceProvider,
                public menuCtrl: MenuController ,
                public distributor :DistributorProvider,
                private authService:AuthServiceProvider, private storage: Storage,
                private order:OrderProvider ,
                public zone: NgZone,public notifications:PushNotificationsProvider
    ) {
/// Reference database location for GeoFire


    }
    gotoselrct(){
        this.navCtrl.push(SelectagentPage);
    }

    gotoorderlater(){
        this.navCtrl.push(OrderlaterPage);
    }
    sendSms(){
        this.sms.send(this.distPhone,'Hello');
    }
    call(){
        this.callNumber.callNumber(this.distPhone, true)
        .then(() => console.log('Launched dialer!'))
        .catch(() => console.log('Error launching dialer'));
    }
    creatdisorder(){
                console.log("IDDDDDDDDDDD"+this.disId);
                this.navCtrl.push(CreateorderPage , this.disId);
            }
            latLng:any;
    sendCurrentLoc(){
        // get current position
        this.geolocation.getCurrentPosition().then((resp) => {
            //current latlng
            this.latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            //initialize map
            let mapOptions = {
                center: this.latLng,
                zoom: 16,
                disableDefaultUI: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            //listn to current location and send it as a distributor valid
            // this.distributor.sendMyLoc(resp.coords.latitude, resp.coords.longitude);
            //       this.distributor.onDistributorDisconnect();
            //creat map
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
          google.maps.event.addListener(this.map, 'click', () => {
            this.zone.run(()=>{
              if(!this.flag)
                this.flag = true ;
            });
          });
        }).catch((error) => {
            // console.log('Error getting location', error);
        });
    }
loadCheck:boolean;
    ionViewWillEnter(){
      // this.commonService.presentLoading("Please Wait...")
      this.loadCheck=true;

      let self=this;
        this.sendCurrentLoc();

      this.geolocation.getCurrentPosition().then((resp) => {
console.log('loc resp lat',resp.coords.latitude)
        //current latlng
      this.distributor.getCurrentIpLocation(resp.coords.latitude, resp.coords.longitude).then((city)=>{
        // this.notifications.sendCustomerMsg("Hi", "Click To View ", city)

        // this.distributor.sendMyLoc(resp.coords.latitude, resp.coords.longitude);
      self.setMarkers(`${city}`);
        this.storage.set('city',`${city}`);

        // this.commonService.dismissLoading(this.loadCheck);
self.loadCheck=false;
      }).catch(err=>{
        self.setMarkers(err);

// this.commonService.dismissLoading(this.loadCheck);
      });     });
      // });
    }
//listenTo markers

    setMarkers(city:any){

   // this.map.clear;

        let self=this;
      ///////////////////////////firebase markers ref
        self.markerRef=firebase.database().ref('valid/'+city);

        //getting all keys (distribuotors IDs)
        self.markerRef.on('value', (snapshot)=> {
       //empty our
          for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(null);
          }
          self.markers=new Array();

            //getting latlng for evry valid distributor
            snapshot.forEach(key => {
                // console.log('changed loc',key.key);

                this. geoFire = new GeoFire(self.markerRef);
//getting latlng using geofire
                this.geoFire.get(key.key).then(function (location) {
                    let latlng = new google.maps.LatLng(location[0],location[1]);

                        self.addMarker(latlng,key.key);
                        console.log('new marker',key.key);
                }, (error)=> {
                    console.log("Error: " + error);
                });
            });
        });
    }
    gotocreatorder(){
        // Create a Firebase reference where GeoFire will store its information
                this.navCtrl.push(CreateorderPage,'no');
            }

    current:any;
    toggleMenu()
    {
        this.menuCtrl.toggle();
    }


    addMarker(latlng:any,key:any){

      var marker = new google.maps.Marker({
icon:'assets/imgs/map_cylinder.png',
        tag:key,
        position:latlng
      });

        // marker.setMap(this.map);
        this.markers.push(marker);
        for(let i=0;i<this.markers.length;i++){

        if(this.markers[i].tag==key){
        //   this.markers[i].setMap(null);

            this.markers[i].setPosition(latlng);
          this.markers[i].setMap(this.map);

          console.log('am in the if loop',this.markers);
            // break;
  }
}
      google.maps.event.addListener(marker, 'click', () => {
        this.zone.run(()=>this.flag=false);
        this.geolocation.getCurrentPosition().then((resp) => {

          //current latlng
          let latLng={lat:resp.coords.latitude,lng: resp.coords.longitude}
          console.log('marker',marker.getPosition().lat())
          console.log('latlng',latLng.lat)
          let loc={lat:marker.getPosition().lat(),lng:marker.getPosition().lng()}
          this.getDistance(latLng,loc);

        })

        // this.getDistance(marker,this.latLng)
        this.order.getDistData(marker.tag).then(user=>{
          // console.log('User',user.rateInfo);
          // console.log('User',user.rateInfo.rateNo);
          // console.log('User',user.rateInfo.rateSum);
          this.commonService.icons(user.rateInfo.rateSum/ user.rateInfo.rateNo)
          console.log('User', this.commonService.icons(user.rateInfo.rateSum/ user.rateInfo.rateNo));
this.starsArray=this.commonService.icons(user.rateInfo.rateSum/ user.rateInfo.rateNo)
        })

            this.distributor.getDistributorName(marker.tag).then((res)=>{
                this.distName = res;
                marker.setTitle(res);
            });
            this.distributor.getDistributorPhone(marker.tag).then((res)=>{
                this.distPhone = res;
            });
            console.log(marker.tag);
            this.disId=marker.tag;
            console.log(this.disId);
        });
    }
//////////////////////////////////////
    flag=true;
  // ionViewWillLeave()
  // {
  //   this.sub.unsubscribe();
  // }
  ionViewWillLeave()
  {
    // this.sub.unsubscribe();
    this.markerRef.off();
  // this.map.clear();
  }
  distance:any;
  getDistance(currentLoc:any,distLoc:any){
    var currentDistLoc = [currentLoc.lat,currentLoc.lng];
    var customerLoc = [ distLoc.lat,distLoc.lng];
    console.log('total distance',currentDistLoc, customerLoc)

    this.distance= GeoFire.distance(customerLoc,currentDistLoc).toFixed(2);
    if(this.distance<=5) {
      // this.commonService.presentConfirm('wait till you get your pipe delevered','i didnet recive my order','i recived my order',this.orderIsDone());
    }
  }


displayRate(starsNo){

    for(let i; i<=starsNo;i++){
this.starsArray.push(1);
  }


  }
}
