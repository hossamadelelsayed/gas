import { SelectagentPage } from './../selectagent/selectagent';
import { CreateorderPage } from './../createorder/createorder';
import {OrderlaterPage} from "../orderlater/orderlater";
import { Component, ViewChild, ElementRef } from '@angular/core';
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
  private sub: Subscription;

  @ViewChild('map') mapElement: ElementRef;

    firebaseRef: any;
    geoFire: any;
    marker:any;
    markerRef:any;
    myLatLng:any;
    smsMessage:any;
    disId:string;
    hits = new BehaviorSubject([])
    constructor(private callNumber: CallNumber,private sms: SMS
                ,public geolocation: Geolocation,
                public navCtrl: NavController,
                public navParams: NavParams,
                public menuCtrl: MenuController ,
                public distributor :DistributorProvider,
                private authService:AuthServiceProvider, private storage: Storage) {
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
                this.navCtrl.push(CreateorderPage , {distId: this.disId});
            }
    sendCurrentLoc(){
        // get current position
        this.geolocation.getCurrentPosition().then((resp) => {
            //current latlng
            let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            //initialize map
            let mapOptions = {
                center: latLng,
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
            this.flag=true;
          });
        }).catch((error) => {
            // console.log('Error getting location', error);
        });
    }

    ionViewDidLoad(){
        let self=this;
        this.sendCurrentLoc();

      let markerRef=firebase.database().ref('/valid/');
      this.geolocation.getCurrentPosition().then((resp) => {

        //current latlng
      this.distributor.getCurrentIpLocation(resp.coords.latitude, resp.coords.longitude).then((city)=>{
      this.distributor.sendMyLoc(resp.coords.latitude, resp.coords.longitude);
      self.setMarkers(city);
        this.storage.set('city',city);

      }).catch(err=>{
        self.setMarkers(err);

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
                this.navCtrl.push(CreateorderPage);
            }

    current:any;
    toggleMenu()
    {
        this.menuCtrl.toggle();
    }
    removeMarker(marker:any){
    }

    addMarker(latlng:any,key:any){

      var marker = new google.maps.Marker({

        tag:key
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
            this.flag=false;
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
  ionViewWillLeave()
  {
    this.sub.unsubscribe();
  }
}
