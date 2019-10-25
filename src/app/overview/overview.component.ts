import { Component, OnInit } from '@angular/core';
import { ApiInfo } from '../models/api-info';
import { ApiInfoService } from '../logic/api-info-service';
import { Card } from '../models/card';
import { ApiCardService } from '../logic/api.card.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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


  constructor(private formBuilder: FormBuilder, private apiInfoService: ApiInfoService, private apiCardService: ApiCardService) { }

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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  }

  array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

}
