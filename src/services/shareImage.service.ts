import {Injectable, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {toObservable} from "@angular/forms/src/validators";
import {Subject} from "rxjs/Subject";


@Injectable()
export class ShareImageService{

  private imgData:Subject<string>;

  /**
   * This method changes the observable value and should trigger all the subscribes cb functions wherever
   * @param {string} base64encoded
   */
  public setData(base64encoded:string){

    this.imgData.next(base64encoded);


  }

  /**
   * Should subscribe to the observable to lookUp for shared data changes
   * @returns {Observable<string>}
   */
  public getData():Observable<string>{

    return this.imgData.asObservable();

  }









}
