import { Component, OnInit } from '@angular/core';
import { ApiInfo } from '../models/api-info';
import { ApiInfoService } from '../logic/api-info-service';
import { Card } from '../models/card';
import { ApiCardService } from '../logic/api.card.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public apiInfo: ApiInfo;
  public cards: Card[] = [];
  public formGroup: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private apiInfoService: ApiInfoService, private apiCardService: ApiCardService) { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      ExpansionsControl: new FormControl()
    })
    this.apiInfoService.GetInfo().subscribe(i => {this.apiInfo = i});
  }

  getSets(): string[] {
    let sets = null;
    if(this.apiInfo != null) {
      sets = this.apiInfo.sets;
    }
    return sets;
  }

  onChangeExpansion() {
    this.apiCardService.SearchForCards(this.formGroup.get("ExpansionsControl").value, "sets")
    .subscribe((c) =>{
      this.cards = c;
    });
  }

}
