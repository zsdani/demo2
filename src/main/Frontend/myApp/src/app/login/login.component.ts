import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../Services/auth.service";
import {Router} from "@angular/router";
import {User} from "../class/User";

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
    private router: Router
  ) {
    this.signinForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {
  }
/*
  login() {
    const val = this.form.value;

    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
        .subscribe(
           data => {


            console.log("User is logged in");
            this.router.navigateByUrl('/mainpage');
          }
        );
    }
  }

 */

  signin(form: FormGroup): void {
    if (form.valid) {
      console.log("heheh")
      this.as.login(<User>form.value)}
    else {
      console.log("ejhhhh");
      //this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }

}
