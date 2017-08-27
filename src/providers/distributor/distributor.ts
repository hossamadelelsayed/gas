import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';

/*
  Generated class for the DistributorProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DistributorProvider {

  constructor(public http: Http) {
    console.log('Hello DistributorProvider Provider');
  }

}
