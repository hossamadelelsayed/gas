import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';
import {AuthServiceProvider} from "../auth-service/auth-service";
/*
  Generated class for the CustomerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CustomerProvider {

  constructor(public http: Http,public authService : AuthServiceProvider) {
    console.log('Hello CustomerProvider Provider');
    //this.authService.doLogin("","");
  }

}
