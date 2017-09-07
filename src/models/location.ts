/**
 * Created by a4p2 on 8/27/2017.
 */
export class Location {
  constructor(
    public lat : number ,
    public lng : number ,
    public label : string ,
    private _locationID : string = null
  ){

  }
  get locationID():string {
    return this._locationID;
  }
}
