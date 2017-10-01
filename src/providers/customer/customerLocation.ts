import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import * as firebase from "firebase";
import {Location} from "../../models/location";
/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CustomerLocationProvider {
  public fireDatabase : any;
  public fireAuth : any;
  constructor() {
    this.fireAuth = firebase.auth();
    this.fireDatabase = firebase.database();
  }
  createLocation(customerID : string , location : Location): Promise<Location>
  {
    let customerLocationPath : string = '/customers/'+customerID+'/locations' ;
    let promise = new Promise((resolve, reject) => {
      let customerLocationsRef = this.fireDatabase.ref(customerLocationPath);
      customerLocationsRef.push(location).then((locationSnapshot:any)=>{
        let customerLocationRef = this.fireDatabase.ref(customerLocationPath+'/'+locationSnapshot.key);
        customerLocationRef.child('locationID').set(locationSnapshot.key)
          .then(()=> {
            customerLocationRef.once('value').then((snapshot)=>{
              resolve(<Location>snapshot.val());
            }).catch((err)=>reject(err));
        }).catch((err)=>reject(err));
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
  updateLocation(customerID : string ,location : Location): Promise<Location>
  {
    let customerLocationPath : string = '/customers/'+customerID+'/locations/'+location.locationID ;
    let promise = new Promise((resolve, reject) => {
      let customerLocationRef = this.fireDatabase.ref(customerLocationPath);
      customerLocationRef.update(location).then(()=>{
        resolve(location);
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
  delLocation(customerID : string ,locationID : string): Promise<boolean>
  {
    let customerLocationPath : string = '/customers/'+customerID+'/locations/'+locationID ;
    let promise = new Promise((resolve, reject) => {
      let customerLocationRef = this.fireDatabase.ref(customerLocationPath);
      customerLocationRef.remove().then(()=>{
        resolve(true);
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
  getLocations(customerID : string): Promise<Location[]>
  {
    let locationsPromises : Promise<Location>[] = [] ;
    let customerLocationPath : string = '/customers/'+customerID+'/locations' ;
    let promise = new Promise((resolve, reject) => {
      let customerLocationRef = this.fireDatabase.ref(customerLocationPath);
      customerLocationRef.once("value")
        .then((snapshot)=>{
          snapshot.forEach((childSnapshot) => {
            let locationRef = this.fireDatabase.ref( customerLocationPath +'/'+childSnapshot.key);
            locationsPromises.push(this.getLocationData(locationRef));
          });
          Promise.all(locationsPromises).then((res)=>{
            resolve(<Location[]>res);
          }).catch((err)=>reject(err))
        }).catch((err)=>reject(err));
    });
    return promise ;
  }
  getLocationData (locationRef :  firebase.database.Reference) : Promise<Location>
  {
    let promise = new Promise((resolve, reject) => {
      locationRef.once('value').then((locationSnapshot)=>{
        resolve(<Location>locationSnapshot.val());
      }).catch((err)=>reject(err));
    });
    return promise ;
  }
}

