export class Shelter {
  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get number(): number {
    return this._number;
  }

  get e_mail(): string {
    return this._e_mail;
  }

  get adress(): string {
    return this._adress;
  }

  get accoun_number(): number {
    return this._accoun_number;
  }

  private _id: number = 0;
  private _name: string = '';
  private _number: number=0;
  private _e_mail: string = '';
  private _adress: string = '';
  private _accoun_number: number=0;

  constructor() {
  }



}
