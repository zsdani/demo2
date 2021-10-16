import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnimalService} from '../Services/animal.service';
import {AnimaldetailsService} from '../Services/animaldetails.service';
import {ShelterService} from '../Services/shelter.service';
import {FileuploadService} from '../Services/fileupload.service';
import * as _ from 'lodash';
import {Animal} from '../class/Animal';
import {httpOptions} from '../Services/auth.service';
import {ImageCroppedEvent} from "ngx-image-cropper";



@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {


  selectedFile!: File;
  // tslint:disable-next-line:variable-name
  private _filename = '';
  imageError = '';
  isImageSaved = true;

  imageUrl: string | ArrayBuffer =
    'https://bulma.io/images/placeholders/480x480.png';
  fileName = 'No file selected';

  constructor(
    private http: HttpClient,
    private fileuploadService: FileuploadService
  ) { }

  ngOnInit(): void {
  }

  title = 'ngImageCrop';

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
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







  onFileSelected(event: any){
    this.selectedFile = (event.target.files[0] as File);


    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = event => {
        this.imageUrl = reader.result;
      };



  }



  // @ts-ignore
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

    //this.http.post(`${'http://localhost:8080/api/files/upload'}`, fd).subscribe();






     this.fileuploadService.addPicc(fd);





  }








  get filename(): string {
    return this._filename;
  }



}
