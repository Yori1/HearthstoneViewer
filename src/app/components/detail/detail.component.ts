import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ApiCardService } from '../../logic/api.card.service';
import { Card } from '../../models/card';
import {NgZone} from '@angular/core';
import { CardImpl } from '../../models/card.impl';
import { ListImpl } from 'src/app/models/list.impl';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

public card: Card;

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private service: ApiCardService,
  private ngZone: NgZone
) {

}

  ngOnInit() {
    this.card = new CardImpl();
    this.route.paramMap.subscribe(params => {
        let name = params.get('name');
        console.log(name);
        this.service.GetCard(name)
        .subscribe(c =>
          this.card = c
      );
    });

  }

}
