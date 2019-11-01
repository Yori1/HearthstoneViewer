import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ListService } from './list.service';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  public listId: string;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService
  ) {

  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listId = params.get("id");
    });
    let cards = this.listService.CardQueryPromiseObservable(this.listId);
    cards.subscribe(c => {
      let cd = c;
      c.then(id => {
        let thing = id;
        let k;
      });
    }
    );
  }
}

