/**
 * Created by a4p2 on 9/7/2017.
 */
export class Rate {
  public static readonly rateCustomerType : string = 'customerRate' ;
  public static readonly rateDistType : string = 'distRate' ;
  public rateID : string ;
  constructor(
    public customerID : string ,
    public distributorID : string ,
    public orderID : string ,
    public rateVal : number ,
    public comment ?: string
  ){
  }
}
