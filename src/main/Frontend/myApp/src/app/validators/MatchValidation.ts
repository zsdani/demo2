import {AbstractControl} from '@angular/forms';

export class MatchValidation {
  // @ts-ignore
  // tslint:disable-next-line:typedef
  static MatchPassword(abstractControl: AbstractControl) {
    // @ts-ignore
    const field = abstractControl.get('password').value;
    // @ts-ignore
    const fieldConfirm = abstractControl.get('passwordConfirm').value;
    if (field !== fieldConfirm) {
      // @ts-ignore
      abstractControl.get('passwordConfirm').setErrors({MatchPassword: true});
    } else {
      // @ts-ignore
      abstractControl.get('passwordConfirm').setErrors(null);
      return null;
    }
  }

}
