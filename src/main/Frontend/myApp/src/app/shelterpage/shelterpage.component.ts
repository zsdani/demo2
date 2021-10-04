import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatchValidation} from '../validators/MatchValidation';
import {User1} from '../class/User1';
import {ShelterService} from '../Services/shelter.service';
import {Shelter} from '../class/Shelter';
import {NotificationService} from '../Services/notification.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Animal} from '../class/Animal';
import {OwnerShelter} from '../class/OwnerShelter';
import {AnimaldetailsService} from '../Services/animaldetails.service';
import {AnimalService} from '../Services/animal.service';

const RegExpValidator = {
  digit: RegExp(/^(?=.*?[0-9])/),
};


@Component({
  selector: 'app-shelterpage',
  templateUrl: './shelterpage.component.html',
  styleUrls: ['./shelterpage.component.css']
})
export class ShelterpageComponent implements OnInit {

  public shelterForm: FormGroup;
  public animalForm: FormGroup;
  public tomb: OwnerShelter[] = [];
  public shelterids: number[] = [];
  public shelter: Shelter;
  public shelters: Shelter[] = [];
  public shelters2: Shelter[] = [];
  public show = false;
  public buttonName: any = 'Új menhely létrehozása';
  public show2 = false;
  public show3 = false;
  public shelterid: number;


  constructor(
    private formBuilder: FormBuilder,
    private shelterService: ShelterService,
    private ns: NotificationService,
    private router: Router,
    private animalService: AnimalService,




  ) {
    this.shelterForm = this.formBuilder.group({
      name: [null, [Validators.minLength(1), Validators.required]],
      city: [null, [Validators.minLength(1), Validators.required]],
      addres: [null, [Validators.minLength(1), Validators.required]],
      postcode: [null, [Validators.minLength(4), Validators.pattern(RegExpValidator.digit), Validators.maxLength(4), Validators.required]],
      // tslint:disable-next-line:max-line-length
      phonenumber: [null, [Validators.minLength(11), Validators.pattern(RegExpValidator.digit), Validators.maxLength(12), Validators.required]],
      e_mail: [null, [Validators.email, Validators.required]],
      // tslint:disable-next-line:max-line-length
      accoun_number: [null, [Validators.minLength(16), Validators.maxLength(16), Validators.pattern(RegExpValidator.digit), Validators.required]]
      });

    this.animalForm = this.formBuilder.group({
      name: [null, [Validators.minLength(1), Validators.required]],
      animaltype_id: [null, [Validators.minLength(1), Validators.required]],
      breed: [null, [Validators.minLength(1), Validators.required]],
      gender: [null, [ Validators.required]],
      // tslint:disable-next-line:max-line-length
      age: [null, [Validators.pattern(RegExpValidator.digit),  Validators.required]],
      size: [null, [Validators.pattern(RegExpValidator.digit),  Validators.required]],
      gonadectomy: [null, [Validators.pattern(RegExpValidator.digit),  Validators.required]],
       shelter_id: [null ],
      illnes: [null, [ Validators.required]],
      lifestory: [null, [ Validators.required]],
      // imagine: [null, [Validators.minLength(1), Validators.required]],
      // tslint:disable-next-line:max-line-length


    });

  }

  ngOnInit(): void {


    this.shelterService.getaSheltertoOwner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: OwnerShelter[]) => {
      console.log(res);
      this.tomb = res;
      console.log(this.tomb);
      for (let i = 0; i < this.tomb.length; i++) {
        this.shelterids[i] = this.tomb[i].shelterid;
      }


      this.shelterService.getShelters().subscribe((res2: Shelter[]) => {
        this.shelters = res2;

        for (let i = 0; i < this.tomb.length; i++) {
          for (let j = 0; j < this.shelters.length; j++) {

            if (this.shelterids[i] === this.shelters[j].id){
              console.log('igaz');
              this.shelters2[i] = this.shelters[j];
            }
          }
        }

      });

    });

  }





addShelter(form: FormGroup) {


    if (form.valid) {
      console.log(form.value);
      this.shelterService.addShelter(form.value as Shelter);

      this.shelterForm.reset();
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
    location.reload();

  }

  addAnimal(form: FormGroup) {
    console.log(form.value);


    if (form.valid) {
      console.log(form.value);
      console.log(form.value.shelter_id);
      form.value.shelter_id = this.shelterid;
      console.log(form.value.shelter_id);
      this.animalService.addAnimal(form.value as Animal);

      this.shelterForm.reset();
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }


  }

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) {
      this.buttonName = 'Mégse';
    }
    else {
      this.buttonName = 'Új menhely létrehozása';
    }
  }

  changeshelterclick() {
    this.show2 = true;
    console.log(this.shelterids);
  }
  addanimalclick(shelteid: number) {
    console.log(shelteid);
    this.shelterid = shelteid;
    this.show3 = true;
  }

}
