import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appDynamicHeaderHost]' })
export class DynamicHeaderHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
