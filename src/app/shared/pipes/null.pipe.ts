import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'if_null',
})
export class IfNullPipe implements PipeTransform {
  transform(value) {
    return value === null || value === '' || value === undefined
      ? 'N/A'
      : value;
  }
}
