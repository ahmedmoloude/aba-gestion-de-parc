import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  //title: string = 'default';

  title$ = new BehaviorSubject<string>('');
  constructor() {}

  set title(title) {
    this.title$.next(title);
  }

  get title(): string {
    return this.title$.getValue();
  }
}
