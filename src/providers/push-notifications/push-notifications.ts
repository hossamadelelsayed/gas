import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from "firebase";
// import {AuthServiceProvider} from "../../providers/auth-service/auth-service";

declare var FCMPlugin;

/*
 Generated class for the PushNotificationsProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class PushNotificationsProvider {

  constructor(
    // public authService:AuthServiceProvider,
    public http: Http) {
    console.log('Hello PushNotificationsProvider Provider');
  }
  //send dist token
  sendDistToken(city:any){
    try{
    let uid=firebase.auth().currentUser.uid

    FCMPlugin.getToken((token)=>{
      console.warn('token is ..',token)
      let ref2=firebase.database().ref('distributors/'+uid);
      ref2.child('devToken').set(token);
      let ref= firebase.database().ref('/cities/'+city);
      ref.child(uid).set(token);
    }).catch((err)=>{
      console.warn(err)
    })}catch(E){
      console.log(E)
    }
  }
  sendCustomerMsg(message:string,City:string){
    try{
      this.getUserName('customers').then(name=>{
        var uid=firebase.auth().currentUser.uid

        var NRef=firebase.database().ref('/messages/'+City+'/'+uid);
        NRef.child('N').once('value').then((N)=>{
          // var no=N.val()+1;

          if(N.val()=='false'){
            var ref= firebase.database().ref('/messages/'+City)
            ref.child(uid).set({
              sendername:name,
              message:message,
              city:City,
              distId:'no',
              N:true
            })}else{
            var ref= firebase.database().ref('/messages/'+City)
            ref.child(uid).set({
              sendername:name,
              message:message,
              city:City,
              distId:'no',
              N:'false'
            })
          }


        });
      })
    }catch(E){
      console.log(E)
    }
  }
  sendToOneDist(message:string,City:string,distId:any){

    try{
    this.getUserName('customers').then(name=>{
      var uid=firebase.auth().currentUser.uid

      var NRef=firebase.database().ref('/messages/'+City+'/'+uid);
      NRef.child('N').once('value').then((N)=>{
        // var no=N.val()+1;

if(N.val()=='false'){
  var ref= firebase.database().ref('/messages/'+City)
  ref.child(uid).set({
    sendername:name,
    message:message,
    city:City,
    distId:distId,
    N:'true'
  })}else{
  var ref= firebase.database().ref('/messages/'+City)
  ref.child(uid).set({
    sendername:name,
    message:message,
    city:City,
    distId:distId,
    N:'false'
  })
}


      });
    })
  }catch(E){
      console.log(E)
    }
  }

  onTokenRecived(){
    FCMPlugin.onNotification(function (token){
      if(token.wasTapped){
        //Notification was received on device tray and tapped by the user.
        alert( JSON.stringify(token) );
      }else{
        //Notification was received in foreground. Maybe the user needs to be notified.
        // alert( JSON.stringify(token) );
      }
    })
    //   .catch(function (e){
    //   console.log("onNotification",e)
    // });
    FCMPlugin.onTokenRefresh(function (token){
      // alert( token );
    })

  }
  getUserName(type: any):Promise<string>{
    let promise = new Promise((resolve, reject) => {
      let name="";
      let user = firebase.auth().currentUser.uid;
      let ref=firebase.database().ref(type+'/'+user);
      ref.child("name").once('value').then((snapshot)=>{
        if (snapshot.val() !=null){
          name= snapshot.val();
          resolve(name);
        }else{reject("user")}

      });
    });
    return promise;
  }



  getNotificationsNo(type: any):Promise<string>{
    let promise = new Promise((resolve, reject) => {
      let name="";
      let user = firebase.auth().currentUser.uid;
      let ref=firebase.database().ref(type+'/'+user);
      ref.child("name").once('value').then((snapshot)=>{
        if (snapshot.val() !=null){
          name= snapshot.val();
          resolve(name);
        }else{reject("user")}

      });
    });
    return promise;
  }

}
