import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../Services/auth.service';
import {NotificationService} from '../../Services/notification.service';
import {User} from '../../class/User';
import {MatchValidation} from '../../validators/MatchValidation';
import {User1} from '../../class/User1';

const RegExpValidator = {
  lowerCase: RegExp(/^(?=.*?[a-z])/),
  upperCase: RegExp(/^(?=.*?[A-Z])/),
  digit: RegExp(/^(?=.*?[0-9])/),
  specialChar: RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/)
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;

  public selectedrole;

  constructor(
    private formBuilder: FormBuilder,
    protected auth: AuthService,
    private ns: NotificationService
  ) {
    this.signupForm = this.formBuilder.group({
        username: [null, [Validators.minLength(4), Validators.required]],
        e_mail: [null, [Validators.email, Validators.required]],
        role: [],
        // tslint:disable-next-line:max-line-length
        password: [null, [Validators.pattern(RegExpValidator.lowerCase), Validators.pattern(RegExpValidator.upperCase), Validators.pattern(RegExpValidator.digit), Validators.pattern(RegExpValidator.specialChar), Validators.minLength(6), Validators.maxLength(30), Validators.required]],
        passwordConfirm: [null, Validators.required]
      },
      {
        validator: MatchValidation.MatchPassword
      });
  }

  ngOnInit(): void {
  }

  signup(form: FormGroup): void {

    if (form.valid) {
      delete form.value.name;
      console.log(form.value);
      delete form.value.passwordConfirm;
      this.auth.register(form.value as User1);

      this.signupForm.reset();
    }
    else {
      this.ns.show('HIBA! Adatok nem megfelelőek!');
    }
  }

}
