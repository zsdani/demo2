import { Component, OnInit } from '@angular/core';
import {Animal} from "../class/Animal";
import {AnimalService} from "../Services/animal.service";
import {AnimaldetailsService} from "../Services/animaldetails.service";
import {AnimalsComponent} from "../animals/animals.component";
import {AuthService} from "../Services/auth.service";
import {Router} from "@angular/router";
import {PopupadoptComponent} from "../popupadopt/popupadopt.component";
import {MatDialog} from "@angular/material/dialog";
import {PopupadoptsureComponent} from "../popupadoptsure/popupadoptsure.component";


@Component({
  selector: 'app-animaldetails',
  templateUrl: './animaldetails.component.html',
  styleUrls: ['./animaldetails.component.css']
})
export class AnimaldetailsComponent implements OnInit {


  animal: Animal = new Animal;
  public _currentlyanimalid: number=this.animal.id




  constructor(
    public dialog: MatDialog,
    private router:Router,
    //private route: ActivatedRoute,
    private animaldetailsService: AnimaldetailsService,
    public auth: AuthService,




  ) { }



  ngOnInit(): void {


    //const id = +this.route.snapshot.paramMap.get('id');
    this.animaldetailsService.getAnimal(this.animaldetailsService.num, this.animaldetailsService.text).subscribe((res: Animal)=>{
      console.log(res)
      this.animal =res;
    });
  }

  adopt() {
    if(this.auth.isLogin$.value)
    {this.dialog.open(PopupadoptsureComponent)}
    else{this.dialog.open(PopupadoptComponent)}
  }


  wirtualadopt(){
    if(this.auth.isLogin$.value)
    {this.router.navigateByUrl('/tobevirtualowner');}
    else{this.dialog.open(PopupadoptComponent)}


  }

  get currentlyanimalid(): number {
    return this._currentlyanimalid;
  }

}
