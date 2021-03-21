import {Shelter} from "./Shelter";
import {AnimalType} from "./AnimalType";

export class Animal {



  id: number = 0;
  name: string = '';
  type: AnimalType= new AnimalType();
  virtual_owner: number=0;
  breed: string = '';
  gender: number=0;
  age: number=0;
  lifestory: string = '';
  imagine: string = '';
  shelter: Shelter = new Shelter;






}
