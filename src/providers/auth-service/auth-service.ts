import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {User} from "firebase/app";
import {DistributorProvider} from'../../providers/distributor/distributor';
import { Geolocation } from '@ionic-native/geolocation';
declare let google;

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
  constructor(  public geolocation: Geolocation,private distributorProvider:DistributorProvider,private storage:Storage, public http: Http,private events :Events) {
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
  phoneLogin(phoneNo:any): Promise <any>{

    let self=this;

    let promise = new Promise((resolve, reject )=>{
      let typeRef = firebase.database().ref(phoneNo);
      typeRef.once("value")
        .then((snapshot)=> {

          let type = snapshot.child("type").val();

          let email : string = snapshot.child("email").val();
          console.log("snapshot",snapshot);

          if(email!=null){
let userdata={uEmail:email,uType:type};
            resolve(userdata);

          }
          else
            reject({message:"Invalid Phone Number"});
          console.log("ee",email);
          // self.events.publish('email status', email);
          // self.events.publish('type', type);

        });

    });



    return promise;
  }



  //login and returns err msg if err occare
  doLogin(phoneNo: string, password: string): Promise <string>{
    let promise = new Promise((resolve, reject )=>{
      this.AnonymousSignIn().then((check)=>{
        if(check==true){
      this.phoneLogin(phoneNo).then(userdata=>{
        this.userDelet();
        this.fireAuth.signInWithEmailAndPassword(userdata.uEmail, password)
          .then(user=>{
            let userId=user.uid;
            resolve(userdata);
            if(userdata.uType=="distributors"){
              this.geolocation.getCurrentPosition().then((resp) => {
                //current latlng
                let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

             this.distributorProvider . sendMyLoc(resp.coords.latitude, resp.coords.longitude)
               console.warn("hi am a distributor")
                });
            }
            console.log("loged in id",userId);
            // this.events.publish('user:created', user);
            // this.events.publish('userId', user.uid);
            // this.getUserInfo(user.uid,"customers");
            resolve('logedIn');
          })  .catch((err)=>reject(err));
      }).catch((err)=>reject(err));
        }
      });
        });

    return promise;

  }

  //signIn annonimously beforelogin
  AnonymousSignIn():Promise<boolean>{
    let promise=new Promise(((resolve, reject) => {
      this.fireAuth.signInAnonymously().then(()=>{
        resolve(true)
      }).catch((error)=> {
        reject(false)
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("error.message",error.message);
        // ...
      });
    }))
    return promise;
  }



////////////////////////////////////////////////////////////
    getUserInfo(userId:any ,userType :any):Promise<any>{
    let promise=new Promise((resolve,reject)=>{//
    let infoRef=firebase.database().ref(userType+"/"+userId);//
    let self=this;//
    infoRef.once("value")//
  .then((snapshot)=> {//
    if(snapshot.val()!=null){
resolve(snapshot.val())}else {
      reject('user not found');
    }
});//
    });//
    return promise;
  }//
  ///////////////////////////////////////////////////////////

// //register a user and transfere him from anonymous user to a user using email and passwo
// userTransfere(email :any ,password:any){//
//   let credential = firebase.auth.EmailAuthProvider.credential(email, password);//
//   this.fireAuth.currentUser.link(credential).then(function(user) {//
// console.log("Anonymous account successfully upgraded", user);//
// }, function(error) {//
// console.log("Error upgrading anonymous account", error);//
// });//
// }//
  ///////////////////////////////////////////////////////////////////////
//tacking img type and base64 img string type
joinTeamImgUpload(imgStr:any,imgType:any):Promise<any>{
  let user = firebase.auth().currentUser.uid;
    let promise = new Promise((resolve, reject )=>{
let  imgRef = firebase.database().ref("distributors/"+user);
      let storageRef = firebase.storage().ref(user+"/"+imgType);
      let message=imgStr;
      storageRef.putString(message, 'base64').then(function (snapshot) {
        console.log('Uploaded a base64 string!',storageRef.bucket);
        // Create a reference to the file we want to download
        console.log('ref', storageRef.bucket);

        imgRef.child("imgType/"+imgType).set(user+"/"+imgType);
        resolve(snapshot);
      }).catch((err)=>{reject(err)});


    });
  return promise;
}
//////////////////////////////////////download img
  joinTeamImgDownload(imgType:any):Promise<any>{

    let user = firebase.auth().currentUser.uid;

    let promise = new Promise((resolve, reject )=>{
      let  imgRef = firebase.database().ref("distributors/"+user);
      let storageRef = firebase.storage().ref(user+"/"+imgType);
    storageRef.getDownloadURL().then((url)=> {
      // Insert url into an <img> tag to "download"
      resolve(url);
      console.log("img downloaded url",url);

    }).catch((error)=> {reject(error)});
    });
  return promise;}

  register(type:any,email: string, password: string,name :string,phoneNo:any): Promise<any> {
    let promise = new Promise((resolve, reject )=>{

      let nameEmailRef = firebase.database().ref(phoneNo);
      //check  if phoneNo entered dont have an email in firebase
      nameEmailRef.once("value")
        .then((snapshot) => {
          if(snapshot.val() ==null ){
            this.fireAuth.createUserWithEmailAndPassword(email, password)
              .then((user)=>{
                let userId=user.uid;
                let rootRef = firebase.database().ref(type+"/"+userId);
                rootRef.child("name").set(name).then(()=>{resolve()}).catch((err)=>{reject(err)});
                rootRef.child("email").set(email).then(()=>{resolve()}).catch((err)=>{reject(err)});
                rootRef.child("phoneNo").set(phoneNo).then(()=>{resolve()}).catch((err)=>{reject(err)});

                let nameEmailRef = firebase.database().ref(phoneNo);
                //check  if phoneNo entered dont have an email in firebase
                nameEmailRef.once("value")
                  .then((snapshot) =>{
                    // if(snapshot.val() ==null )    {
                    let rootRef = firebase.database().ref(type+"/"+userId);
                    rootRef.child("name").set(name).then(()=>{resolve()}).catch((err)=>{reject(err)});
                    rootRef.child("email").set(email).then(()=>{resolve()}).catch((err)=>{reject(err)});
                    rootRef.child("phoneNo").set(phoneNo).then(()=>{resolve()}).catch((err)=>{reject(err)});
                    // let nameEmailRef = firebase.database().ref(phoneNo);
                    nameEmailRef.child("email").set(email).then(()=>{resolve()}).catch((err)=>{reject(err)});;
                    nameEmailRef.child("type").set(type).then(()=>{resolve()}).catch((err)=>{reject(err)});;
                    //
                    // }else {
                    //   console.log("user exist");
                    //   reject("phone err");
                    //   // this.userDelet().then(data=>{
                    //   //   console.log("deleted",data);
                    //   //   reject("phone err");
                    //   // });
                    // }

                  });
                 resolve(user);
              }).catch((err)=>{reject(err)});
            // resolve()
          }else{reject("phone taken")}

      });
    });
    return promise;
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
userDelet():any{

  //get current user
  let user = firebase.auth().currentUser;
  if(user.isAnonymous){
    return  user.delete();

  }

}
getUserId(){
  let user = firebase.auth().currentUser.uid;
  return user;
}
////////////////////////////////////////////////////////////update user informations///////////////////////////////////////////////////
editCustomerName(name :string) : Promise<boolean>{
  let promise = new Promise((resolve, reject) => {
    let user = firebase.auth().currentUser.uid;
    let userNameRef=firebase.database().ref("customers/"+user);
    userNameRef.child("name").set(name).then(()=>{
      resolve(true);
    }).catch((err)=>reject(err));
  });
  return promise;

}
  editdistributorName(name :string) : Promise<boolean>{
    let promise = new Promise((resolve, reject) => {

      let user = firebase.auth().currentUser.uid;

      let userNameRef=firebase.database().ref("distributors/"+user);
      userNameRef.child("name").set(name).then(()=>{
        resolve(true);
      }).catch((err)=>reject(err));
    });
    return promise;

  }
  ////////////////
oldPhoneNo :any;

editCustomerPhoneNo(newPhoneNo :any) : Promise<boolean>{
let user = firebase.auth().currentUser.uid;
  console.log(user);
  let promise = new Promise((resolve, reject) => {
    let userPhoneRef=firebase.database().ref("customers/"+user);
    userPhoneRef.once("value")
      .then((snapshot)=>{
        let phoneNoVal = snapshot.child("phoneNo").val();
        console.log("phone value",phoneNoVal);
        let ref=firebase.database().ref();
        let child = ref.child(phoneNoVal);
        child.once('value').then((oldPhonesnapshot)=>{
          ref.child(newPhoneNo).set(oldPhonesnapshot.val()).then(()=>{
            if(  ref.child(newPhoneNo+"/email").key !=  ref.child(phoneNoVal).key)
              child.remove().then(()=>{
                userPhoneRef.child("phoneNo").set(newPhoneNo).then(()=>{
                  resolve(true);
                }).catch((err)=>reject(err));
              }).catch((err)=>reject(err));
          }).catch((err)=>reject(err));
        }).catch((err)=>reject(err))
      }).catch((err)=>reject(err))
  });
  return promise ;
 }
 editDistributorsPhoneNo(type:any,newPhoneNo :any) : Promise<boolean>{
  let user = firebase.auth().currentUser.uid;
  console.log(user);
  let promise = new Promise((resolve, reject) => {
    let userPhoneRef=firebase.database().ref(type+"/"+user);
    userPhoneRef.once("value")
      .then((snapshot)=>{
        let phoneNoVal = snapshot.child("phoneNo").val();
        console.log("phone value",phoneNoVal);
        let ref=firebase.database().ref();
        let child = ref.child(phoneNoVal);
        child.once('value').then((oldPhonesnapshot)=>{
          ref.child(newPhoneNo).set(oldPhonesnapshot.val()).then(()=>{
            if(  ref.child(newPhoneNo+"/email").key !=  ref.child(phoneNoVal).key)
              child.remove().then(()=>{
                userPhoneRef.child("phoneNo").set(newPhoneNo).then(()=>{
                  resolve(true);
                }).catch((err)=>reject(err));
              }).catch((err)=>reject(err));
          }).catch((err)=>reject(err));
        }).catch((err)=>reject(err))
      }).catch((err)=>reject(err))
  });
  return promise ;
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
  editPassword(newPassword:any):Promise<any>{
let promise=new Promise((resolve,reject)=>{
  let user = firebase.auth().currentUser;

  user.updatePassword(newPassword).then(msg=> {
    // Update successful.
    resolve(msg);
  }).catch(function(error) {
    // An error happened.
    reject(error);
  });
});
  return promise;
}

editEmail(type:any,uId:any,newEmail:any,phoneNo:any,password:any):Promise<any>{
  let promise=new Promise((resolve,reject)=>{
    this.editDistributorsPhoneNo(type,phoneNo).then(()=>{
    let user = firebase.auth().currentUser;
    console.log('oldEmail',user.email);
    // this.fireAuth.signInWithEmailAndPassword(user.email,password )
    //   .then(user=>{
        user.updateEmail(newEmail).then(msg=> {
          // Update successful.

          let userId=user.uid;



          /////////
          let ref=firebase.database().ref();

          ref.once('value',(snapshot)=>{
            ref.child(phoneNo+"/email").set(newEmail);
            ref.child(phoneNo+"/type").set(type);

          });
          let ref2=firebase.database().ref(type+"/"+uId+"/email");

          ref2.once('value',(snapshot)=>{
            ref2.set(newEmail);

          });

        })  .then((msg)=>{
          resolve(msg);

        }).catch((err)=>reject(err));
    //   }).catch(function(error) {
    //   // An error happened.
    //   reject(error);
    // });
  });});
  return promise;
}
}
