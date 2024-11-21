import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appCambiarColor]',
  standalone: true,
})
export class CambiarColorDirective {
  @Input('appCambiarColor') condition!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.condition) {
      this.renderer.setStyle(
        this.el.nativeElement,
        'backgroundColor',
        'lightgreen'
      );
    }
  }
}
