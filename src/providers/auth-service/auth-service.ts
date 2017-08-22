import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import {NavController} from 'ionic-angular';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  public fireAuth: any;
  public userData: any;
  constructor(public http: Http
    // ,private navCtrl:NavController
  ) {
    this.fireAuth = firebase.auth();
     this.userData = firebase.database().ref('/userData');
  }
  //login by phone and password
//friest getting email using phone no
  getLogInEmail(phoneNo:any){

    let emailRef = firebase.database().ref(phoneNo);


    emailRef.once("value")
      .then(function(snapshot) {

        let firstName = snapshot.child(phoneNo).val(); // "Ada"

        console.log("id     :  ",firstName);
        return  firstName;

      });

  }
  //send customer info to database authentication succses
  submitUserInfo(name:any ,phoneNo :any,userId :any,email:any){
    let rootRef = firebase.database().ref("customers/"+userId);

rootRef.child("name").set(name);
 rootRef.child("email").set(email);
 rootRef.child("phoneNo").set(phoneNo);

 let nameEmailRef = firebase.database().ref(phoneNo);
nameEmailRef.child(phoneNo).set(email);
  }
  //signIn annonimously beforelogin
  AnonymousSignIn(){
    return this.fireAuth.signInAnonymously().catch(function(error) {
     // Handle Errors here.
     let errorCode = error.code;
     let errorMessage = error.message;
     console.log("error.message",error.message);
     // ...
   });
  }
  //login and returns err msg if err occare
  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password).catch(err=>
    {
      console.log("log in failed msg",err.message);
    });
  }
  register(email: string, password: string): any {
  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      this.userData.child(newUser.uid).set({email: email});
    });
}

//resetPassword
resetPassword(email: string): any {
  return this.fireAuth.sendPasswordResetEmail(email).catch(err=>
  {
    console.log("log in failed msg",err.message);
  });
}
//logout
doLogout(): any {
  return this.fireAuth.signOut();
}
// redirect to Login Page if no user found/login.
noUser(userId :any){
  if(userId==null){
    console.log("user state msg","no user");
return null;
  }else{
    return userId;
  }

}
}
