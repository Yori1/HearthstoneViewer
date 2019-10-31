import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {

  public listId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.listId = params.get("id");
      });
  }

}
