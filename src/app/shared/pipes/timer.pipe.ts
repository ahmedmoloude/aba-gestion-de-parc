import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timer',
})
export class TimerPipe implements PipeTransform {
  transform(value) {
    let feedback = '';
    if (value && value != 'N/A') {
      if (typeof value === 'string' || value instanceof String) {
        let result = value.toString().split(':');
        if (result[0] != '00') feedback += result[0] + ' h ';
        if (result[1] != '00')
          feedback += this.secondes(result[2], result[1]) + ' min ';
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
