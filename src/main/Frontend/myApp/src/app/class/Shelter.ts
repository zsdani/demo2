export class Shelter {
  get _id(): number {
    return this.id;
  }

  get _name(): string {
    return this.name;
  }

  get _phonenumber(): string {
    return this.phonenumber;
  }

  get _e_mail(): string {
    return this.e_mail;
  }

  get _city(): string {
    return this.city;
  }

  get _postcode(): string {
    return this.postcode;
  }

  get _adress(): string {
    return this.addres;
  }

  get _accoun_number(): string {
    return this.accoun_number;
  }





  public id: number = 0;
  public name: string = '';
  public phonenumber: string='';
  public e_mail: string = '';
  public city: string = '';
  public postcode: string = '';
  public addres: string = '';
  public accoun_number: string='';
  constructor() {
  }



}
