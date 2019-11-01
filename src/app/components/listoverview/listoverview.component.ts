import { Component, OnInit } from '@angular/core';
import { ListImpl } from 'src/app/models/list.impl';
import { Observable } from 'rxjs';
import { List } from 'src/app/models/list';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-listoverview',
  templateUrl: './listoverview.component.html',
  styleUrls: ['./listoverview.component.css']
})
export class ListoverviewComponent implements OnInit {

  public lists: Observable<List[]>;
  private newListName: String;

  constructor(private db: AngularFirestore) {
    this.lists = db.collection<List>('/lists').snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        const name = data.name;
        return new ListImpl(name, id, []);
      })
});
}

  ngOnInit() {

  }

  onKey(value: string) {
    this.newListName = value;
  }

  onClickAdd() {
    this.db.collection('/lists').add({name: this.newListName});
  }

}
