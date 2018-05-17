import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as GLOBALS from '../app/app.constants';


@Injectable()
export class MapfreService {

  private token: string = '1b26cb2f76ea4cb0979026ef6c350d05';
  private urlDialogFlow: string = 'https://api.dialogflow.com/v1/';
  private SESSION_ID: string;


  constructor(public httpClient: HttpClient) {

    if (localStorage.getItem(GLOBALS.STR_SESSION_ID)) {

      //IF the user's already in possesion of an ID lets just use that one
      this.SESSION_ID = localStorage.getItem(GLOBALS.STR_SESSION_ID);

    } else {

      //Otherwise, get a Session ID by just calling a pseudo TIMESTAMP

      this.SESSION_ID = Date.now().toString();
      localStorage.setItem(GLOBALS.STR_SESSION_ID, this.SESSION_ID);


    }
    console.log('API Service initiallized. Session ID : ' + this.SESSION_ID);

  }

  public getHeaders(): HttpHeaders {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    })

    return headers;
  }

  public sendQuery(query: string, lang?: string, context?: string, sessionId?: string): Observable<Object> {

    let url='';
    if (lang && context && sessionId) {

       url = this.urlDialogFlow + `query?v=20150910&contexts=${context}&lang=${lang}&query=${query}&sessionId=${sessionId}&timezone=ES`;
   

    }
    else if (lang && context) {

       url = this.urlDialogFlow + `query?v=20150910&contexts=${context}&lang=${lang}&query=${query}&sessionId=${this.SESSION_ID}&timezone=ES`;




    } else if (context) {

       url = this.urlDialogFlow + `query?v=20150910&contexts=${context}&lang=${GLOBALS.LANG_ES}&query=${query}&sessionId=${this.SESSION_ID}&timezone=ES`;




    } else {

       url = this.urlDialogFlow + `query?v=20150910&lang=${GLOBALS.LANG_ES}&query=${query}&sessionId=${this.SESSION_ID}&timezone=ES`;




    }

    let headers: HttpHeaders = this.getHeaders();

    return this.httpClient.get(url, {headers});
  }
}
