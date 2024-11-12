import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ver-comentario',
  standalone: true,
  imports: [],
  templateUrl: './ver-comentario.component.html',
  styleUrl: './ver-comentario.component.css',
})
export class VerComentarioComponent {
  @Input() comentario: string = ''; // Recibe el comentario por input
  @Input() titulo: string = 'Ver Comentario'; // Recibe el título por input

  @Output() salir: EventEmitter<void> = new EventEmitter();

  cerrarComentario() {
    this.salir.emit();
  }
}
