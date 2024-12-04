import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutes',
})
export class MinutesPipe implements PipeTransform {
  transform(value) {
    let feedback = '';
    if (value > 0) {
      let days = Math.floor(Math.floor(value / 60) / 24);
      let hours = Math.floor(value / 60) - days * 24;
      let mins = value - days * 24 * 60 - hours * 60;
      if (days > 0) feedback += days + ' jours ';
      if (hours > 0) feedback += Math.floor(hours) + ' h ';
      if (mins > 0) feedback += Math.floor(mins) + ' min ';
    }
    if (feedback == '') {
      feedback = '00 min';
    }
    return feedback;
  }
}
