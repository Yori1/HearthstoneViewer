import { AngularFirestore } from '@angular/fire/firestore';
import { Card } from 'src/app/models/card';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CardManagingService {

  public listId;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute

  ){

  }



  public AddCard(cardId: string): Promise<boolean> {
    let ref = this.firestore.collection('/lists').doc(this.listId);

    return ref.ref.get().then(doc => {
      if(doc.exists) {
        let collectionCardIds: string[] =  doc.get('cardIds');
        if(collectionCardIds == undefined) {
          collectionCardIds = [];
        }
        collectionCardIds.push(cardId);
        ref.set({cardIds: collectionCardIds});

        return true;
      }

      else return false;

    });




  }
}
