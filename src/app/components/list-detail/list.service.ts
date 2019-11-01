import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Card } from 'src/app/models/card';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private fireStore: AngularFirestore
  ){}

  public CardQueryPromiseObservable(idListToGetFor: string): Observable<Promise<any>> {
    let listChanges = this.fireStore.collection("/lists").doc(idListToGetFor).snapshotChanges();
    let observablePromises = listChanges
    .map((action) =>{
      let listIds: number[] = action.payload.get('cardIds');
      if(listIds == undefined) {
        listIds = [];
      }
      return listIds.map(id => this.fireStore
        .collection<Card>('/cards').ref.where('cardId', '==', id.toString()).get());
      });

      let observablePromise = observablePromises.filter(a => a.length > 0)
      .map(a => a[0]);

     return observablePromise.map(p => p.then(p => p.docs[0].get('cardId')))
  }
}
