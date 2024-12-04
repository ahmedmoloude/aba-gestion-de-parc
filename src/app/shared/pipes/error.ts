import { Pipe, PipeTransform } from '@angular/core';
import { ERRORS } from '../../core';

@Pipe({
  name: 'error',
  pure: false,
})
export class ErrorPipe implements PipeTransform {
  //Affiche un message pour une erreur donnée, la vérification se fait juste pour les types max et minlength
  transform(error: string, param: string = undefined): string {
    let errorMsg = ERRORS.field + ERRORS[error];
    if (param != undefined) {
      errorMsg = errorMsg + param + ERRORS.caracters;
    }
    return errorMsg;
  }
}
