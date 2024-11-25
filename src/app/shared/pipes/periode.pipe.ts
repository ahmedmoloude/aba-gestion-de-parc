import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periode',
})
export class PeriodePipe implements PipeTransform {
  transform(value) {
    let feedback = '';
    if (value && value != 'N/A') {
      if (typeof value === 'string' || value instanceof String) {
        let result = value.toString().split(':');
        if (result[0] != '00') feedback += result[0] + ' jours ';
        if (result[1] != '00') feedback += result[1] + ' h ';
        if (result[2] != '00')
          feedback += this.secondes(result[3], result[2]) + ' min ';
        //if(result[3] != '00') feedback+=result[3]+' sec ';
      }
    }
    if (feedback == '') {
      feedback = '00 min';
    }
    return feedback;
  }
  secondes(secondes, minutes) {
    let min = Number(minutes);
    let sec = Number(secondes);
    if (!isNaN(sec)) {
      if (sec > 29) {
        min++;
      }
    }
    return min;
  }
}
