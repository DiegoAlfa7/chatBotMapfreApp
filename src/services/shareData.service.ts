import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { toObservable } from "@angular/forms/src/validators";
import { Subject } from "rxjs/Subject";


@Injectable()
export class ShareDataService {

  private imgData: Subject<string>;
  private img: string;

  private audioData: Subject<string>;
  private audio: string;


  /**
   * This method changes the observable value and should trigger all the subscribes cb functions wherever
   * @param {string} base64encoded
   */
  public setData(base64encoded: string) {


    this.img = base64encoded;
    this.imgData.next(this.img);


  }

  /**
   * Should subscribe to the observable to lookUp for shared data changes
   * @returns {Observable<string>}
   */
  public getImgData(): Observable<string> {

    return this.imgData.asObservable();

  }


  public setAudio(bytesAudio: string) {

    this.audio = bytesAudio;
    this.audioData.next(this.audio);
  }


  public getAudioData(): Observable<string> {

    return this.audioData.asObservable();
  }


}
