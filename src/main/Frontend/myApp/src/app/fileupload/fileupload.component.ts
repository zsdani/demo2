import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AnimalService} from "../Services/animal.service";
import {AnimaldetailsService} from "../Services/animaldetails.service";
import {ShelterService} from "../Services/shelter.service";
import {FileuploadService} from "../Services/fileupload.service";
import * as _ from 'lodash';



@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  selectedFile!: File;
  imageError: string="";
  isImageSaved: boolean=true;

  constructor(
    private http: HttpClient,
    private fileuploadService: FileuploadService
  ) { }





  onFileSelected(event: any){
    this.selectedFile=<File>event.target.files[0];

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

    fd.append('file',this.selectedFile,this.selectedFile.name)
    this.http.post(`${'http://localhost:8080/api/files/upload'}`,fd)
      .subscribe(res =>{
        console.log(res);
      })

  }





  ngOnInit(): void {
  }



}
