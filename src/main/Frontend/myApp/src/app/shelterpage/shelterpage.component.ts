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
import {FileuploadComponent} from '../fileupload/fileupload.component';
import {FileuploadService} from '../Services/fileupload.service';
import * as _ from 'lodash';
import {base64ToFile, ImageCroppedEvent} from 'ngx-image-cropper';

const RegExpValidator = {
  digit: RegExp(/^(?=.*?[0-9])/),
};


@Component({
  selector: 'app-shelterpage',
  templateUrl: './shelterpage.component.html',
  styleUrls: ['./shelterpage.component.css']
})
export class ShelterpageComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private shelterService: ShelterService,
    private ns: NotificationService,
    private router: Router,
    private animalService: AnimalService,
    private fileuploadService: FileuploadService







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

    this.shelterForm2 = this.formBuilder.group({
      name: [ this.shelterid, [Validators.minLength(1), Validators.required]],
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
      name:   [null, [ Validators.required]],
      animaltype_id:  [null, [Validators.minLength(1), Validators.required]],
      breed:   [null, [Validators.minLength(1), Validators.required]],
      gender:   [null, [ Validators.required]],
      // tslint:disable-next-line:max-line-length
      age:   [null, [  Validators.required]],
      size:   [null, [  Validators.required]],
      gonadectomy:   [null, [  Validators.required]],
      shelter_id: [], // [null, [ Validators.required] ],
      illnes:  [null, [ Validators.required]],
      lifestory: [null, [ Validators.required]],
      imagine: [null, [ Validators.required]]
      // imagine: [null, [Validators.minLength(1), Validators.required]],
      // tslint:disable-next-line:max-line-length


    });

  }

  public shelterForm: FormGroup;
  public shelterForm2: FormGroup;
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
  public fileupload: FileuploadComponent;
  selectedFile!: File;
  selectedFile2!: File;
  // tslint:disable-next-line:variable-name
  private _filename = '';
  imageError = '';
  isImageSaved = true;

  imageUrl: string | ArrayBuffer =
    'https://bulma.io/images/placeholders/480x480.png';
  fileName = 'No file selected';


  title = 'ngImageCrop';

  imageChangedEvent: any = '';
  croppedImage: any = '';

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

  onFileSelected(event: any){
    this.imageChangedEvent = event;
    this.selectedFile = (event.target.files[0] as File);


    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = event => {
      this.imageUrl = reader.result;
    };



  }

  onUpload(){



    const allowed_types = ['image/png', 'image/jpeg'];
    const fd = new FormData();

    let isImageSaved;
    if (!_.includes(allowed_types, this.selectedFile.type)) {
      this.imageError = 'Only Images are allowed ( JPG | PNG )';
      isImageSaved = false;
    }
    console.log();
    this._filename = this.selectedFile.name;

    fd.append('file', this.selectedFile, this.selectedFile.name);

    // this.http.post(`${'http://localhost:8080/api/files/upload'}`, fd).subscribe();


    this.fileuploadService.addPicc(fd);





  }

  modifyShelter(form: FormGroup){

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

    const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];
    const fd = new FormData();

    let isImageSaved;
    if (!_.includes(allowed_types, this.selectedFile.type)) {
      this.imageError = 'Only Images are allowed ( JPG | PNG )';
      isImageSaved = false;
    }
    this._filename = this.selectedFile.name;
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.fileuploadService.addPicc(fd);

    form.value.shelter_id = this.shelterid;
    form.value.imagine = this.selectedFile.name;
    if (form.valid) {

      this.animalService.addAnimal(form.value as Animal);

      this.animalForm.reset();
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek2!');


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

  changeshelterclick(shelteid: number) {
    this.show2 = true;
    this.show3 = false;
    this.shelterid = shelteid;
    this.shelterService.getShelter(this.shelterid);
  }

  cancel() {
    this.show2 = false;

  }
  addanimalclick(shelteid: number) {
    console.log(shelteid);
    this.shelterid = shelteid;
    this.show3 = true;
    this.show2 = false;

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    let fileToReturn = this.base64ToFile(
      event.base64,
      this.imageChangedEvent.target.files[0].name,
    );


    this.selectedFile = fileToReturn;

    //return fileToReturn;
  }
  imageLoaded() {
    /* show cropper */
  }
  cropperReady() {
    /* cropper ready */
  }
  loadImageFailed() {
    /* show message */
  }

  // tslint:disable-next-line:typedef
  base64ToFile(data, filename) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--){
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

}
