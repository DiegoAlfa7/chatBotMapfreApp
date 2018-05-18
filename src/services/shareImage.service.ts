import {Injectable, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {toObservable} from "@angular/forms/src/validators";
import {Subject} from "rxjs/Subject";


@Injectable()
export class ShareImageService{


  private imgData:Subject<string>;
  private img:string;

  private imgDataArr:Subject<string[]>;
  private imaArr:string[];


  public addImgArr(string:string){

    this.imaArr = [... this.imaArr , string];
    this.imgDataArr.next(this.imaArr);
  }


  /**
   * This method changes the observable value and should trigger all the subscribes cb functions wherever
   * @param {string} base64encoded
   */
  public setData(base64encoded:string){


    this.img = base64encoded;
    this.imgData.next(this.img);


  }

  /**
   * Should subscribe to the observable to lookUp for shared data changes
   * @returns {Observable<string>}
   */
  public getData():Observable<string>{

    return this.imgData.asObservable();

  }









}
