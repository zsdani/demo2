import { Component, OnInit } from '@angular/core';
import {Animal} from "../class/Animal";
import {AnimalService} from "../Services/animal.service";
import {AnimaldetailsService} from "../Services/animaldetails.service";
import {AnimalsComponent} from "../animals/animals.component";


@Component({
  selector: 'app-animaldetails',
  templateUrl: './animaldetails.component.html',
  styleUrls: ['./animaldetails.component.css']
})
export class AnimaldetailsComponent implements OnInit {

  animal: Animal = new Animal;
  szam:number=33;



  constructor(
    //private route: ActivatedRoute,
    private animaldetailsService: AnimaldetailsService,

  ) { }

  ngOnInit(): void {


    //const id = +this.route.snapshot.paramMap.get('id');
    this.animaldetailsService.getAnimal(this.animaldetailsService.num, this.animaldetailsService.text).subscribe((res: Animal)=>{
      console.log(res)
      this.animal =res;
    });
  }

}
