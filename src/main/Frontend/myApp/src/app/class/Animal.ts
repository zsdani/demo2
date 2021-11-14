import {Shelter} from './Shelter';
import {AnimalType} from './AnimalType';
import {IsAdopted} from "./IsAdopted";

export class Animal {



  id = 0;
  name = '';
  type: AnimalType = new AnimalType();
  virtual_owner: IsAdopted = new IsAdopted();
  breed = '';
  gender = 0;
  age = 0;
  lifestory = '';
  imagine = '';
  illnes = '';
  gonadectomy = 0;
  size = 0;
  shelter: Shelter = new Shelter();
  isadopted: IsAdopted = new IsAdopted();
  owner = '';
  thestatus=0;






}
