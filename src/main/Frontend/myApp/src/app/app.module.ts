import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalsComponent } from './animals/animals.component';
import {HttpClientModule} from "@angular/common/http";
import {AnimalService} from "./Services/animal.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConnectionComponent } from './connection/connection.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from '@angular/material/select';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './auth/login/login.component';
import { AnimaldetailsComponent } from './animaldetails/animaldetails.component';
import {AnimaldetailsService} from "./Services/animaldetails.service";
import { FileuploadComponent } from './fileupload/fileupload.component';
import {FileuploadService} from "./Services/fileupload.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NotificationService} from "./Services/notification.service";
import { SignupComponent } from './auth/signup/signup.component';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import { AuthComponent } from './auth/auth.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatCard} from "@angular/material/card";
import { SignupasShelterComponent } from './auth/signupas-shelter/signupas-shelter.component';


@NgModule({
  declarations: [
    AppComponent,
    AnimalsComponent,

    ConnectionComponent,

    MainpageComponent,

    LoginComponent,


    AnimaldetailsComponent,

    FileuploadComponent,

    SignupComponent,

    AuthComponent,

    SignupasShelterComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatMenuModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatPasswordStrengthModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatTabsModule,





  ],
  providers: [
    AnimalService,
    AnimaldetailsService,
    FileuploadService,
    NotificationService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
