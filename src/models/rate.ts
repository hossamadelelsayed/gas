/**
 * Created by a4p2 on 9/7/2017.
 */
export class Rate{
  private _orderID : string ;
  private _rateID : string ;
  constructor(
    private _customerID : string ,
    private _distributorID : string ,
    private _comment : string
  ){
  }
  get customerID():string {
    return this._customerID;
  }
  get orderID():string {
    return this._orderID;
  }
  get rateID():string {
    return this._rateID;
  }
  get distributorID():string {
    return this._distributorID;
  }
  get comment():string {
    return this._comment;
  }
}
