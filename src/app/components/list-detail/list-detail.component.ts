import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ListService } from './list.service';
import { CardDisplayingService } from '../overview/card.displaying.service';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  public listId: string;

  constructor(
    private route: ActivatedRoute,
    public listService: ListService,
    public displayingService: CardDisplayingService
  ) {

  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listId = params.get("id");
      this.listService.UpdateCardsInList(this.listId);
    });
  }
}

