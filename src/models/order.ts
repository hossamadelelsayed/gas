/**
 * Created by a4p2 on 8/27/2017.
 */
import {Location} from './location';
export class Order{
  public static readonly NoResponseStatus : string = 'noResponse' ;
  public static readonly PendingStatus : string = 'pending' ;
  public static readonly RejectedStatus : string = 'rejected' ;
  public static readonly DeliveredStatus : string = 'delivered' ;
  public static readonly AssignAllDist : string = 'allDist' ;
  public static readonly AssignSpecificDist : string = 'specificDist' ;
  public static readonly ordersToAllDistCreatedEvent : string = 'ordersToAllDist:created';
  public static readonly ordersToAllDistRemovedEvent : string = 'ordersToAllDist:removed';
  public static readonly ordersToSpecificDistCreatedEvent : string = 'ordersToSpecificDist:created';
  public static readonly ordersToSpecificDistRemovedEvent : string = 'ordersToSpecificDist:removed';
  public static readonly distHistoryChangeEvent : string = 'distHistory:change' ;
  public static readonly customerHistoryChangeEvent : string = 'customerHistory:change' ;
  private _assignDistType : string ;
  private _assignDistID : string ;
   constructor(
    private  _customerID : string ,
    private  _pipesNo : number ,
    private  _location : Location ,
    private  _paymentType : string ,
    private  _deliveryDate : Date = null ,
    private  _monthly : boolean = false ,
    private  _status ?: string ,
    private  _date ?: Date ,
    private  _distributerID ?: string ,
    private  _orderID ?: string
  ) {
  }


  get assignDistID():string {
    return this._assignDistID;
  }
  set assignDistID(val : string) {
    this._assignDistID = val;
  }
  get assignDistType():string {
    return this._assignDistType;
  }
  set assignDistType(val : string) {
    this._assignDistType = val;
  }

  get monthly():boolean {
    return this._monthly;
  }
  set monthly(val : boolean) {
    this._monthly = val;
  }

  get customerID():string {
    return this._customerID;
  }
  set customerID(val : string) {
    this._customerID = val;
  }

  get deliveryDate(): Date {
    return this._deliveryDate;
  }
  set deliveryDate(val : Date) {
    this._deliveryDate = val;
  }

  get pipesNo():number {
    return this._pipesNo;
  }
  set pipesNo(val : number) {
    this._pipesNo = val;
  }

  get location():Location {
    return this._location;
  }
  set location(val : Location) {
    this._location = val;
  }

  get paymentType():string {
    return this._paymentType;
  }

  set paymentType(val : string) {
    this._paymentType = val;
  }

  get status():string {
    return this._status;
  }

  get date(): Date {
    return this._date;
  }

  get distributerID(): string {
    return this._distributerID;
  }

  get orderID():string {
    return this._orderID;
  }

}


