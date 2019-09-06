import { Component, OnInit } from '@angular/core';
import * as M from 'node_modules/materialize-css'

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var elems = document.querySelectorAll('.scrollspy');
    M.ScrollSpy.init(elems);
  }

}
