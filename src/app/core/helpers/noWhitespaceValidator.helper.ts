import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class noWhitespace {
  public validator(control: FormControl) {
    if (control instanceof FormControl && control) {
      const isValid = (control.value + '' || '').trim().length !== 0;
      return isValid ? null : { whitespace: true };
    }
  }
}
