import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appZoom]',
  standalone: true,
})
export class ZoomDirective {
  @Input('appZoom') zoomFactor: number = 1.2; // Factor de zoom (default 1.2)

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `scale(${this.zoomFactor})`
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'transform 0.3s'
    );

    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'pink');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
    this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
  }
}
