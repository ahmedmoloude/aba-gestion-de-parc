import { AbstractControl, ValidatorFn } from '@angular/forms';

export const PHONE_REGEX = /^(05|06|07)[0-9]{8}$/ ;

export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    console.log('VALUE TEST', control.value)
    if(control.value == ""){
      return null
    }
    const valid = PHONE_REGEX.test(control.value);
    return valid ? null : { invalidPhone: true };
  };
}