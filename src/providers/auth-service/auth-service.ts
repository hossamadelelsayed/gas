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
  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }
  register(email: string, password: string): any {
  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      this.userData.child(newUser.uid).set({email: email});
    });
}
resetPassword(email: string): any {
  return this.fireAuth.sendPasswordResetEmail(email);
}
doLogout(): any {
  return this.fireAuth.signOut();
}
// redirect to Login Page if no user found/login.
noUser(LoginPage : string){
  firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    // this.navCtrl.setRoot(LoginPage);
  }
});
}
}
