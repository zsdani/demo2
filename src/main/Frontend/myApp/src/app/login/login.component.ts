import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../Services/auth.service";
import {Router} from "@angular/router";
import {User} from "../class/User";
import {HttpClient} from "@angular/common/http";
import {NotificationService} from "../Services/notification.service";

const RegExpValidator = {
  'lowerCase': RegExp(/^(?=.*?[a-z])/),
  'upperCase': RegExp(/^(?=.*?[A-Z])/),
  'digit': RegExp(/^(?=.*?[0-9])/),
  'specialChar': RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/)
};


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public signinForm: FormGroup;
  public valami: string | undefined;

  constructor(
    private fb:FormBuilder,
    private as: AuthService,
    private http: HttpClient,
    private router: Router,
    private ns : NotificationService
  ) {
    this.signinForm = this.fb.group({
      username: [null, [Validators.minLength(4),Validators.required]],
      password: [null, [Validators.minLength(6),Validators.required]]
    });
  }

  ngOnInit(): void {
  }


  signin(form: FormGroup): void {
    if (form.valid) {
      this.as.login(<User>form.value);
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }

  }

}
