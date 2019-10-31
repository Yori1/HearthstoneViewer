import { List } from './list';

export class ListImpl implements List {
  constructor(
    private _name: string,
    private _id: string,
    private _cardIds: number[]

  ) {

  }
  public get cardIds(): number[] {
    return this._cardIds;
  }

  public get name(): string {
    return this._name;
  }

  public get id(): string {
    return this._id;
  }

}
