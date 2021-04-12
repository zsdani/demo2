import {AbstractControl} from "@angular/forms";

export class MatchValidation {
  // @ts-ignore
  static MatchPassword(abstractControl: AbstractControl) {
    // @ts-ignore
    let field = abstractControl.get('password').value;
    // @ts-ignore
    let fieldConfirm = abstractControl.get('passwordConfirm').value;
    if (field != fieldConfirm) {
      // @ts-ignore
      abstractControl.get('passwordConfirm').setErrors({MatchPassword: true});
    } else {
      // @ts-ignore
      abstractControl.get('passwordConfirm').setErrors(null);
      return null;
    }
  }

}
