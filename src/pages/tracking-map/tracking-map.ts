import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import {Component, ElementRef, ViewChild} from '@angular/core';


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
  @ViewChild('map') mapElement: ElementRef;
  public map: any;
  public Markers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams ,
              public events : Events ) {
    this.events.subscribe('dist:available', () => {
    })
  }
  ionViewWillEnter()
  {
    this.loadMap();
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackingMapPage');
  }

}
