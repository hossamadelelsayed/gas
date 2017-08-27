import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
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
  constructor(public http: Http,private events :Events) {
    this.fireAuth = firebase.auth();
     this.userData = firebase.database().ref('customers');
  }
  //login by phone and password
//friest getting email using phone no

  getLogInEmail(phoneNo:any){

    let emailRef = firebase.database().ref(phoneNo);


    emailRef.once("value")
      .then(function(snapshot) {

        let email = snapshot.child(phoneNo+"/email").val(); // "Ada"

        console.log("id     :  ",email);
        return  email;

      });

  }
  phoneLogin(phoneNo:any,password :any){

    let typeRef = firebase.database().ref(phoneNo);

let self=this;
    typeRef.once("value")
      .then(function(snapshot) {

        let type = snapshot.child("type").val();


let email = snapshot.child("email").val();
console.log("email ...",snapshot);
console.log("type ...",type);

self.doLogin(email,password);


      });

  }

  //login and returns err msg if err occare
  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
//     .then(user=>{
//       let userId=user.uid;
// this.getUserInfo(user.uid,"customers");
//
//     }).catch(err=>
//     {
//     });
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




  getUserInfo(userId:any ,userType :any){
let infoRef=firebase.database().ref(userType+"/"+userId);
let self=this;
infoRef.once("value")
  .then(function(snapshot) {
    return snapshot.val();

});

 // self.events. unsubscribe('user');

  }
//register a user and transfere him from anonymous user to a user using email and passwo
userTransfere(email :any ,password:any){
  let credential = firebase.auth.EmailAuthProvider.credential(email, password);
  this.fireAuth.currentUser.link(credential).then(function(user) {
console.log("Anonymous account successfully upgraded", user);
}, function(error) {
console.log("Error upgrading anonymous account", error);
});
}
  register(email: string, password: string,name :string,phoneNo:any): any {


  return this.fireAuth.createUserWithEmailAndPassword(email, password);
//     .then((newUser) => {
//     this.userData.child(newUser.uid).set({email: email});
// let      user = firebase.auth().currentUser;
// this.submitUserInfo(name,phoneNo,user.uid,email);
//       user.sendEmailVerification().then(function() {
//        // Email sent.
//       }).catch(function(error) {
// this.events.publish('vrification error', error);
//       });
//     }).catch(function(error) {
//       this.events.publish('registretion error', error);
//     });
  }

  //send customer info to database when authentication succses
  submitUserInfo(name:any ,phoneNo :any,userId :any,email:any){
    let rootRef = firebase.database().ref("customers/"+userId);
     rootRef.child("name").set(name);
     rootRef.child("email").set(email);
     rootRef.child("phoneNo").set(phoneNo);

    let nameEmailRef = firebase.database().ref(phoneNo+"/email");
    //check  if phoneNo entered dont have an email in firebase
    nameEmailRef.once("value")
      .then(function(snapshot) {
        if(snapshot.val() ==null )    {
        let rootRef = firebase.database().ref("customers/"+userId);
        rootRef.child("name").set(name);
        rootRef.child("email").set(email);
        rootRef.child("phoneNo").set(phoneNo);
         // let nameEmailRef = firebase.database().ref(phoneNo);
        nameEmailRef.set(email);
        }else {
console.log("user exist");
        }

      });
  }

//resetPassword
resetPassword(email: string): any {
  return this.fireAuth.sendPasswordResetEmail(email);
}
//logout
doLogout(): any {
  return this.fireAuth.signOut();
}


//get current user profile and delet it
userDelet(){

  //get current user
  let user = firebase.auth().currentUser;

  user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    console.log("user delet error msg",error);
    // An error happened.
  });
}
////////////////////////////////////////////////////////////update user informations///////////////////////////////////////////////////
editCustomerName(name :string){
  let user = firebase.auth().currentUser;
let userNameRef=firebase.database().ref("customers/"+user.uid);
userNameRef.child("name").set(name);
}


editCustomerPhoneNo(phoneNo :any,newPhoneNo :any){

  let user = firebase.auth().currentUser;
let userPhoneRef=firebase.database().ref("customers/"+user.uid);

userPhoneRef.once("value")
  .then(function(snapshot) {

    let phoneNoVal = snapshot.child("phoneNo").val();
    console.log("phone value",phoneNoVal);

    let ref=firebase.database().ref();
    var child = ref.child(phoneNoVal);
    child.once('value', function(snapshot) {

      ref.child(newPhoneNo+"/email").set(snapshot.val());

      if(  ref.child(newPhoneNo+"/email").key !=  ref.child(phoneNoVal).key)
      {
        child.remove();

      }

    });
    userPhoneRef.child("phoneNo").set(newPhoneNo);
  });

}
}
