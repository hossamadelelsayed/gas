import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from "firebase";

/*
  Generated class for the AboutusProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AboutusProvider {
firebaseRef=firebase.database();
  constructor(public http: Http) {
    console.log('Hello AboutusProvider Provider');
  }
  aboutUs(title:any,paragraph:any){
    let about=this.firebaseRef.ref("about");
    about.once("value")
      .then(function(snapshot) {
        about.child('title').set(title);

about.child('paragraph').set(paragraph);

      });
  }
  termsAndConditions(title:any,paragraph:any){
    let about=this.firebaseRef.ref("terms");
    about.once("value")
      .then(function(snapshot) {
        about.child('title').set(title);

        about.child('paragraph').set(paragraph);

      });
  }
}
