import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

/**
 * Implements the calls to external services, ex: MATRICULA_OCR
 */
@Injectable()
export class ExternalsService {


  constructor(
      private http:HttpClient
  ){}



  public reconocerMatrícula(base64:string):Observable<Object>{


    let url = 'http://api.cemobile.eu/gv/reconocer_matricula';

    let formPart = new FormData();

    let blob:Blob = this.btblob(base64);

    formPart.append('file', blob);

    let headers = new HttpHeaders().set('Authorization', 'Bearer 1b26cb2f76ea4cb0979026ef6c350d05')
      .set('Access-Control-Allow-Origin','*');

    return this.http.post(url, formPart, {headers});


  }

  public getDatosAsegurado():Observable<Object>{

    let url = 'http://api.cemobile.eu/gv/datos_matricula';





    return this.http.post(url, null);



  }




  /**
   * Convers a string base64 encoded image to a Binary Large Object by reading each 'real' character byte value
   * @param b64Data
   * @param contentType
   * @param sliceSize
   * @returns {Blob}
   */
  public b64toBlob(b64Data, contentType, sliceSize):Blob {

    contentType = contentType || '';

    sliceSize = sliceSize || 512;

    //First, get the real characters
    let characters = atob(b64Data);
    let parentByteArrays = [];


    //Slice String representation and add each character byte value in the slice to the byteArray
    for (let offset = 0; offset < characters.length; offset += sliceSize) {

      // for a 512 slice we are calculating each of those 512 characters unicode value as we fill those values into an array
      let slice = characters.slice(offset, offset + sliceSize);

      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      let byteArray = new Uint8Array(byteNumbers);

      parentByteArrays.push(byteArray);
    }

    let blob = new Blob(parentByteArrays, {type: contentType});
    return blob;
  }

  /**
   * An ugly version of the upper method 'b64toBlob'
   *
   * @param {string} string
   * @returns {Blob}
   */
  btblob(string:string){

    let decodedS = atob(string);

    let ab = new ArrayBuffer(decodedS.length);
    let ia = new Uint8Array(ab);
    for (var i = 0; i < decodedS.length; i++) {
      ia[i] = decodedS.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    let bb = new Blob([ab]);
    return bb;
  }







}
