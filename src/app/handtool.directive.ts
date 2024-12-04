import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHandtool]'
})
export class HandtoolDirective {

  private container: HTMLElement;
  private startX: number;
  private startY: number;
  private zoom = 1.0;
  private maxZoom = 2;
  private minZoom = 0.2;

  constructor(private el: ElementRef) {
    this.container = el.nativeElement;
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {

    console.log('mouseDown,,,,,,,,');
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.container.style.cursor = 'grabbing';
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    if (event.buttons === 1) {
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;
      this.startX = event.clientX;
      this.startY = event.clientY;
      (<HTMLElement>this.container.childNodes[0]).style.left = (parseFloat((<HTMLElement>this.container.childNodes[0]).style.left) + deltaX).toString()+'px';
      (<HTMLElement>this.container.childNodes[0]).style.top = (parseFloat((<HTMLElement>this.container.childNodes[0]).style.top) + deltaY).toString()+'px';
    }
  }

  @HostListener('mouseup') onMouseUp() {
    this.container.style.cursor = 'grab';
  }


  zoomIn() {
    if (this.zoom < this.maxZoom) {
      this.zoom += 0.1;
      let children = this.container.childNodes
      for (let index = 0; index < children.length; index++) {
        const element = children[index] as HTMLElement;
        if (element && element.style) {
          element.style.transform = `scale(${this.zoom})`;
        }
      }
    }
    
  }

  zoomOut() {
    if (this.zoom > this.minZoom) {
      this.zoom -= 0.1;
      let children = this.container.childNodes

      for (let index = 0; index < children.length; index++) {
        const element = children[index] as HTMLElement;
        if (element && element.style) {
          element.style.transform = `scale(${this.zoom})`;
        }
      }
    }
  }

  reinit(){
    // if (this.zoom > this.minZoom) {
      this.zoom = 1;
      let children = this.container.childNodes

      for (let index = 0; index < children.length; index++) {
        const element = children[index] as HTMLElement;
        if (element && element.style) {
          element.style.transform = `scale(${this.zoom})`;
        }
      }
      (<HTMLElement>this.container.childNodes[0]).style.left = '0px';
      (<HTMLElement>this.container.childNodes[0]).style.top = '0px';
    // }
  }


  @HostListener('mousewheel', ['$event']) onMouseWheel(event: WheelEvent) {
    event.preventDefault();
    if (event.deltaY > 0) {
      this.zoomOut();
    } else {
      this.zoomIn();
    }
  }
}

