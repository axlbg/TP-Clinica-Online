import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appDisableIfEmpty]',
  standalone: true,
})
export class DisableIfEmptyDirective {
  @Input('appDisableIfEmpty') valueToCheck!: any[];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.valueToCheck?.length === 0) {
      this.renderer.addClass(this.el.nativeElement, 'disable');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'disable');
    }
  }
}
