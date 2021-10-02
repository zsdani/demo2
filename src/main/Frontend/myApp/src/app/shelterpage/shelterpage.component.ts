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
  public tomb: OwnerShelter[] = [];
  public shelterids: number[] = [];
  public shelter: Shelter;
  public shelters: Shelter[] = [];
  public shelters2: Shelter[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private shelterService: ShelterService,
    private ns: NotificationService,



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

  }

  ngOnInit(): void {


    this.shelterService.getaSheltertoOwner(parseInt(localStorage.getItem('ownerID'))).subscribe((res: OwnerShelter[]) => {
      console.log(res);
      this.tomb = res;
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
    const PostData = {
      ownderid: localStorage.getItem('ownerID'),
      id: form.value.id
    };

    if (form.valid) {
      console.log(form.value);
      this.shelterService.addShelter(form.value as Shelter);

      this.shelterForm.reset();
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }



  }

}
