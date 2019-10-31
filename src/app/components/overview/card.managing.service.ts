import { FirebaseFirestore } from 'angularfire2';
import { Card } from 'src/app/models/card';

export class CardManagingService {
  constructor(
    private firestore: FirebaseFirestore
  ){}

  public AddCard(card: Card) {
    let ref = this.firestore.collection('/lists').doc('IWzx1ZSBO54wgKhlJlwE');
    let collectionCardIds: number[];

    let arrUnion = ref.update({
      cardIds: this.firestore.FieldValue.arrayUnion('greater_virginia')
    });

    ref.set(SetOptions)


  }
}
