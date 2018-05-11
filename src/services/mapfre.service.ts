import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MapfreServiceService {

    token: string = '1b26cb2f76ea4cb0979026ef6c350d05';
    urlMapfre: string = 'https://api.dialogflow.com/v1/';
    mensajes = [];

    constructor(public httpClient: HttpClient) { }

    public getHeaders(): HttpHeaders {

        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.token
        })

        return headers;
    }

    public getQuery(sessionId: string) {

        const url = this.urlMapfre + `query?v=20150910&contexts=shop&lang=es&query=apple&sessionId=${sessionId}&timezone=Europa/España`;

        let headers: HttpHeaders = this.getHeaders();

        return this.httpClient.get(url, { headers }).map((respose: any) => {
            console.log( respose);
        })

    }
}
