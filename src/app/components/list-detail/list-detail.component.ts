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
  public twitterLink: string;

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

    const func = (d,s,id) => {
      var js: any,
          fjs=d.getElementsByTagName(s)[0],
          p='https';
      if(!d.getElementById(id)){
          js=d.createElement(s);
          js.id=id;
          js.src=p+"://platform.twitter.com/widgets.js";
          fjs.parentNode.insertBefore(js,fjs);
      }

      this.twitterLink = 'https://twitter.com/intent/tweet?text=I%20made%20a%20list%20check%20it%20out%20';
  }
  func(document,"script","twitter-wjs");
  }
}

