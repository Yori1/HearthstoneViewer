import { Component, OnInit } from '@angular/core';
import { ApiInfo } from '../models/api-info';
import { ApiInfoService } from '../logic/api-info-service';
import { Card } from '../models/card';
import { ApiCardService } from '../logic/api.card.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import * as Shake from '../../../node_modules/shake.js'

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public apiInfo: ApiInfo;
  public cards: Card[] = [];
  public formGroup: FormGroup;
  public default = "Basic";

  private shake: Shake;

  constructor(
    private formBuilder: FormBuilder,
     private apiInfoService: ApiInfoService,
      private apiCardService: ApiCardService) { }

  ngOnInit() {
      this.formGroup = new FormGroup({
      ExpansionsControl: new FormControl()
    })
    this.apiInfoService.GetInfo().subscribe(i => {
      this.apiInfo = i;
      this.formGroup.get("ExpansionsControl").updateValueAndValidity();
    });

    this.apiCardService.SearchForCards("Naxxramas", "sets")
    .subscribe((c) =>{
      this.cards = c;
    });

    this.shake = new Shake({threshold: 15});
    this.shake.start();
    window.addEventListener('shake', function(){
      this.cards=[];
  }, false);

  }

  getCardImage(card: Card): string {
    return "https://media.services.zam.com/v1/media/byName/hs/cards/enus/" + card.cardId + ".png";
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
