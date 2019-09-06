import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from './card';
import { Observable } from 'rxjs';
import 'rxjs-compat';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class ApiCardService {
    private _cards: Card[];

    constructor(
        private http: HttpClient
    ){}

    public SearchForCards(query: String): Observable<Card> {
        let convertedQuery = "%7B" + query + "%7D";
        let url = environment.hearthstoneApi + environment.searchEndpoint + convertedQuery;
        let headers = new HttpHeaders()
        .set("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com")
        .set("x-rapidapi-key", environment.apiKey);

        return this.http.get<Card>(url, {headers: headers});
    }


}