import {RateInfo} from "./rateInfo";
/**
 * Created by a4p2 on 8/28/2017.
 */
export class User {
  public static readonly Customer: string = 'customer';
  public static readonly Distributor: string = 'distributor';
  private _name : string ;
  private _phoneNo : number ;
  private _email : string ;
  private _rateInfo : RateInfo ;
  constructor(){
  }
  get name():string {
    return this._name;
  }
  get phoneNo():number {
    return this._phoneNo;
  }
  get email():string {
    return this._email;
  }
  get rateInfo(): RateInfo {
    return this._rateInfo;
  }


}
