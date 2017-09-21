/**
 * Created by a4p2 on 9/20/2017.
 */
export class RateInfo {
  public rateNo : number ;
  constructor(
    public rateSum : number
  ){
    this.rateNo = 1 ;
  }
  public calculateRate() : number{
      return this.rateSum / this.rateNo ;
  }
}
