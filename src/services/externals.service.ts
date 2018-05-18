import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

/**
 * Implements the calls to external services, ex: MATRICULA_OCR
 */
@Injectable()
export class ExternalsService {


  constructor(
      private http:HttpClient
  ){}



  reconocerMatrícula(base64:string):string{

    let matriculaReconocida=undefined;

    let url = 'http://api.cemobile.eu/gv/reconocer_matricula';

    let formPart = new FormData();

    let blob:Blob = this.b64toBlob(base64, 'multipart/form-data', 512 );

    formPart.append('file', blob);

    this.http.post(url, formPart).subscribe((respuesta:any)=>{

      matriculaReconocida = respuesta.matricula;


    }, (error)=>{

        console.log(error.toString());


    });

    return matriculaReconocida || 'error-reconociendo-matricula';





  }


  b64toBlob(b64Data, contentType, sliceSize) {

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







}
