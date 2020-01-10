import { Directive,ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTablero]'
})
export class TableroDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
