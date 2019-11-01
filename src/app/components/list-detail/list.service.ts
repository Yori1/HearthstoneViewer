import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card';
import { ApiCardService } from 'src/app/logic/api.card.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private _cardsInList: Observable<Card>[] = [];


    public get cardsInList(): Observable<Card>[]
 {
        return this._cardsInList;
    }


  constructor(
    private fireStore: AngularFirestore,
    private apiCardService: ApiCardService,
  ){}

  public UpdateCardsInList(id: string) {
   this.GetCards(id).subscribe(oc => this._cardsInList = oc)
  }

  private GetCards(idListToGetFor: string): Observable<Observable<Card>[]> {
    let listChanges = this.fireStore.collection("/lists").doc(idListToGetFor).snapshotChanges();
    let cardIds = listChanges
    .map((action) =>{
      let cardIds: string[] = action.payload.get('cardIds');
      if(cardIds == undefined) {
        cardIds = [];
      }
      return cardIds;
      });

      return cardIds.map(ids => ids.map(id => this.apiCardService.GetCard(id)));
  }
}
