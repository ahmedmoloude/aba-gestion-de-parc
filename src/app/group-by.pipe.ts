import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupBy'
})
export class GroupByPipe implements PipeTransform {
  transform(collection: any[], property: string): any[] {
    let result = [];
    if(!collection) return null;
    collection.forEach( c => {
      let element = result.find(r => r.customer_id == c.customer_id && r.pickup_address_id == c.pickup_address_id);
      if(element){
        c.planified_passages_time.forEach(e => {
          element.planified_passages_time.push(e)
        });
      }
      else result.push(c);
    })
    return result;
  }

}
