import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../models/card';
import { Observable } from 'rxjs';
import 'rxjs-compat';
import { environment } from 'src/environments/environment';
import { ApiInfo } from '../models/api-info';

@Injectable({
    providedIn: "root"
})
export class ApiInfoService {
    constructor(
        private http: HttpClient
    ){}

    public GetInfo(): Observable<ApiInfo> {
        let url = environment.hearthstoneApi + environment.infoEndpoint;
        let headers = new HttpHeaders()
        .set("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com")
        .set("x-rapidapi-key", environment.apiKey);

        return this.http.get<ApiInfo>(url, {headers: headers});
    }
}