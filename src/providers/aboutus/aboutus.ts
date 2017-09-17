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
  arAboutUs(){
let title='عن غاز السعودية'    ;
let paragraph='هذا التطبيق لخدمات توزيع انابيب الغاز بالمملكة العربية السعودية ';
    let about=this.firebaseRef.ref("ar_about");
    about.once("value")
      .then(function(snapshot) {
        about.child('title').set(title);

about.child('paragraph').set(paragraph);

      });
  }
  arTermsAndConditions(){
    let title='الشروط والاحكام'    ;
    let paragraph='هذا التطبيق لخدمات توزيع انابيب الغاز بالمملكة العربية السعودية ';
    let about=this.firebaseRef.ref("ar_terms");
    about.once("value")
      .then(function(snapshot) {
        about.child('title').set(title);

        about.child('paragraph').set(paragraph);

      });
  }
  enAboutUs(){
    let title='About GasKSa';
    let paragraph='This App is for distributing of gas pips inside the KSA ';
    let about=this.firebaseRef.ref("en_about");
    about.once("value")
      .then(function(snapshot) {
        about.child('title').set(title);

about.child('paragraph').set(paragraph);

      });
  }
  enTermsAndConditions(){
    let title='Terms And Conditions'    ;
    let paragraph='This App is for distributing of gas pips inside the KSA ';
    let about=this.firebaseRef.ref("en_terms");
    about.once("value")
      .then(function(snapshot) {
        about.child('title').set(title);

        about.child('paragraph').set(paragraph);

      });
  }
  arGetAboutUs():Promise<any>{
    let promise=new Promise((resolve, reject )=>{
      let about=this.firebaseRef.ref("ar_about");
about.once(('value'),snapshot=>{
  console.log(snapshot)

  resolve(snapshot)
})
    });
  return promise;
}
  arGetTermsAndConditions():Promise<any>{
    let promise=new Promise((resolve, reject )=>{
      let about=this.firebaseRef.ref("ar_terms");
      about.once(('value'),snapshot=>{
        console.log(snapshot)

        resolve(snapshot)
      })
    });
    return promise;
  } enGetAboutUs():Promise<any>{
    let promise=new Promise((resolve, reject )=>{
      let about=this.firebaseRef.ref("en_about");
about.once(('value'),snapshot=>{
  console.log(snapshot)

  resolve(snapshot)
})
    });
  return promise;
}
  enGetTermsAndConditions():Promise<any>{
    let promise=new Promise((resolve, reject )=>{
      let about=this.firebaseRef.ref("en_terms");
      about.once(('value'),snapshot=>{
        console.log(snapshot)
        resolve(snapshot)

      })
    });
    return promise;
  }
}
