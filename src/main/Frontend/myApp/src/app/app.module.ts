import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnimalsComponent } from './animals/animals.component';
import {HttpClientModule} from '@angular/common/http';
import {AnimalService} from './Services/animal.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ConnectionComponent } from './connection/connection.component';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './auth/login/login.component';
import { AnimaldetailsComponent } from './animaldetails/animaldetails.component';
import {AnimaldetailsService} from './Services/animaldetails.service';
import { FileuploadComponent } from './fileupload/fileupload.component';
import {FileuploadService} from './Services/fileupload.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NotificationService} from './Services/notification.service';
import { SignupComponent } from './auth/signup/signup.component';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { AuthComponent } from './auth/auth.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';

import {AuthService} from './Services/auth.service';
import {ShelterService} from './Services/shelter.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PopupadoptComponent} from './popupadopt/popupadopt.component';
import { TobevirtualownerComponent } from './tobevirtualowner/tobevirtualowner.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PopupadoptsureComponent } from './popupadoptsure/popupadoptsure.component';
import { CalendarComponent } from './calendar/calendar.component';
import {CalendarCommonModule, CalendarModule, DateAdapter} from 'angular-calendar';
import {CommonModule} from '@angular/common';
import {NgbModalModule, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { ShelterpageComponent } from './shelterpage/shelterpage.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgImageSliderModule} from 'ng-image-slider';

import { CommentComponent } from './comment/comment.component';
import { NgbdRatingBasicComponent } from './ngbd-rating-basic/ngbd-rating-basic.component';
import { NotificationComponent } from './notification/notification.component';
import {MatBadge, MatBadgeModule} from '@angular/material/badge';
import { MenuComponent } from './menu/menu.component';













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

    PagenotfoundComponent,

    PopupadoptComponent,

    TobevirtualownerComponent,

    PopupadoptsureComponent,


    CalendarComponent,


    DatePickerComponent,
    TimepickerComponent,
    ShelterpageComponent,
    CommentComponent,
    NgbdRatingBasicComponent,
    NotificationComponent,
    MenuComponent,














  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatToolbarModule,
        FormsModule,
        MatButtonToggleModule,
        MatInputModule,
        MatSnackBarModule,
        MatPasswordStrengthModule,
        ReactiveFormsModule,
        MatOptionModule,
        MatTabsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        CalendarCommonModule,
        CalendarModule,
        NgImageSliderModule,
        MatBadgeModule,


        CommonModule,
        NgbModalModule,
        FormsModule,
        FlatpickrModule.forRoot(),
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule,
        ImageCropperModule,
        NgbRatingModule,


    ],
  providers: [
    AnimalService,
    AnimaldetailsService,
    FileuploadService,
    AuthService,
    ShelterService,
    NotificationService,
    {provide: MAT_DATE_LOCALE, useValue: 'hu-HU'},
    ImageCropperModule,



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
