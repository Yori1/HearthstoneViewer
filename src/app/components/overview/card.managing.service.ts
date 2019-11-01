import { AngularFirestore } from '@angular/fire/firestore';
import { Card } from 'src/app/models/card';
import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCardService } from 'src/app/logic/api.card.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CardManagingService {

  public listId;

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private lookupService: ApiCardService,
    private _snackBar: MatSnackBar

  ){

  }



  public AddCard(cardId: string){
    let ref = this.firestore.collection('/lists').doc(this.listId);

    let cardToAdd = this.lookupService.GetCard(cardId);
    cardToAdd.subscribe(c => {

      ref.ref.get().then(doc => {
        if(doc.exists) {
          let collectionCardIds: string[] =  doc.get('cardIds');
          if(collectionCardIds == undefined) {
            collectionCardIds = [];
          }
          collectionCardIds.push(cardId);
          ref.update({cardIds: collectionCardIds});
          this._snackBar.open("Successfully added " + c[0].name + " to the list.");

        }

        else {
          this._snackBar.open("Failed to add " + c[0].name);
        }
    });
    });




  }
}
