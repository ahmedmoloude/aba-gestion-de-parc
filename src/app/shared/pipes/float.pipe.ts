import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'float',
})
export class FloatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return value == null ? null : value.toFixed(2);
  }
}
