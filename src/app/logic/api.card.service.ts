import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../models/card';
import { Observable } from 'rxjs';
import 'rxjs-compat';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class ApiCardService {
    constructor(
        private http: HttpClient
    ){}

    public SearchForCards(query: String, endpoint: string): Observable<Card[]> {
        let convertedQuery =  "/" + query ;
        let url = environment.hearthstoneApi + "cards/" + endpoint + convertedQuery;
        let headers = new HttpHeaders()
        .set("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com")
        .set("x-rapidapi-key", environment.apiKey);

        return this.http.get<Card[]>(url, {headers: headers})
        .map(l => l.filter(c => c.img != undefined));
    }

    public GetCard(name: string): Observable<Card> {
      let url = environment.hearthstoneApi + "cards/" + name;
      let headers = new HttpHeaders()
      .set("x-rapidapi-host", "omgvamp-hearthstone-v1.p.rapidapi.com")
      .set("x-rapidapi-key", environment.apiKey);

      return this.http.get<Card>(url, {headers: headers});

    }
}
