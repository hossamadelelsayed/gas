import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, NavParams, Events} from 'ionic-angular';

declare var google: any;
/**
 * Generated class for the CustomerMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-customer-map',
  templateUrl: 'customer-map.html',
})
export class CustomerMapPage {
  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public Markers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public events : Events ) {
    this.events.subscribe('dist:available', () => {
      this.allmessages = [];
    })
  }
  ionViewWillEnter()
  {
    this.loadMap();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Map');



  }
  loadMap()
  {
    let latLng = new google.maps.LatLng(25.286106, 51.534817 );

    let mapOptions = {
      center: latLng,
      zoom:10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  setMarkers()
  {
    let array = [] ;
    for (let i = 0; i < array.length; i++){
      let LatLng = new google.maps.LatLng(parseFloat(array[i].latitude),parseFloat(array[i].longitude));
      this.addMarker(LatLng);
    }

  }
  addMarker(LatLng : any){
    let image : string ;
      image = 'assets/imgs/agent_pin.png' ;
    let marker  = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: LatLng ,
      icon : { url : image }
    });
    let self = this ;
    marker.addListener('click', function() {

    });
    google.maps.event.addListener(marker,'click',function() {
      // var infowindow = new google.maps.InfoWindow({
      //   content:address
      // });
      // infowindow.open(this.map,marker);
    });
    this.Markers.push(marker);
  }
  adjustBounds()
  {
    let bounds = new google.maps.LatLngBounds();
    for (let i = 0; i < this.Markers.length; i++) {
      bounds.extend(this.Markers[i].getPosition());
    }
    this.map.fitBounds(bounds);
  }
}
