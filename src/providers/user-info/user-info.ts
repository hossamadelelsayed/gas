import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserInfoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserInfoProvider {
email:any;
name:any;
phone:any;
orders:any;
locations:any;
  constructor(private storage:Storage ,public http: Http,private events:Events) {
    console.log('Hello UserInfoProvider Provider');

  }
  getAll(){

    let self=this;
    this.events.subscribe('user', (user) => {
this.storage.set('name', user.name);

      //  console.log('Welcome', user);
self.email=user.email;
self.name=user.name;
self.locations=user.locations;
self.phone=user.phone;
self.orders=user.orders;
self.setName(user.name);
// console.log(this.getName());
return user;
     });
  }
  setName(name :any){
    this.name=name;
  }
getName(){
  this.events.subscribe('userName', (user) => {
console.log("name",user.name);
return user.name;

   });
}
}
