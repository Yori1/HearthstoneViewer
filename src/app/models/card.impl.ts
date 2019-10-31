import { Card } from "./card";

export class CardImpl implements Card {
   cardId: string;
   dbfId: number;
  name: string;
  cardSet: string;
  type: string;
  img: string;
  text: string;
  imgGold: string;
}
