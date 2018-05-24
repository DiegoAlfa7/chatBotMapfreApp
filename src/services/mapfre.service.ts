import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as GLOBALS from '../app/app.constants';
import { BotResponse } from '../app/classes/BotResponse';
import { BoundTextAst } from '@angular/compiler';
import { BotContext } from '../app/classes/BotContext';
import { TokenService } from './token.service';


@Injectable()
export class MapfreService {

  private token: string = '1b26cb2f76ea4cb0979026ef6c350d05';
  private urlDialogFlow: string = 'https://api.dialogflow.com/v1/';
  private SESSION_ID: string;


  constructor(public httpClient: HttpClient, private tokenService: TokenService) {

    this.updateToken();

      //Otherwise, get a Session ID by just calling a pseudo TIMESTAMP

      this.SESSION_ID = Date.now().toString();
      localStorage.setItem(GLOBALS.STR_SESSION_ID, this.SESSION_ID);

    console.log('API Service initiallized. Session ID : ' + this.SESSION_ID);

  }

  private updateToken () {
    this.tokenService.getToken(GLOBALS.NEOCOVER_TOKEN).subscribe( (response: any) => {
      this.token = response.token;
    });
  }

  public getHeaders(): HttpHeaders {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    return headers;
  }

  public sendQuery(query: string, lang?: string, context?: string, sessionId?: string): Observable<Object> {

    const sessionIdParam = sessionId || this.SESSION_ID;
    const langParam = lang || GLOBALS.LANG_ES;
    let url = `${this.urlDialogFlow}query?v=20150910&timezone=ES&query=${query}&lang=${langParam}&sessionId=${sessionIdParam}`;

    if (lang) {
      url += `&lang=${lang}`;
    }

    if (context) {
      url += `&contexts=${context}`;
    }

    let headers: HttpHeaders = this.getHeaders();

    return this.httpClient.get(url, { headers });
  }
}
