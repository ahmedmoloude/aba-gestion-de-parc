import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationHelper } from '../../core/helpers';

@Directive({
  selector: '[appCustomRouterLink]',
})
export class RouterlinkCustomDirective {
  constructor(
    private router: Router,
    private navigationHelper: NavigationHelper
  ) {}

  @Input('appCustomRouterLink') routerLink: any;

  @HostListener('click', ['$event']) onClick() {
    this.navigationHelper.navigate(this.routerLink);
  }
}
