/**
 * Created by a4p2 on 9/20/2017.
 */
export class RateInfo {
  constructor(
    public rateSum : number ,
    public rateNo : number = 1
  ){
  }
  calculateRate() : number{
      return this.rateSum / this.rateNo ;
  }
}
