import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.css',
})
export class ComentarioComponent {
  @Input() titulo: string = 'Deja un comentario';

  comentario: string = '';
  @Output() comentarioEnviado: EventEmitter<string> = new EventEmitter();
  @Output() salir: EventEmitter<void> = new EventEmitter();

  enviarComentario() {
    if (this.comentario.trim()) {
      this.comentarioEnviado.emit(this.comentario);
      this.comentario = '';
    }
  }

  salirSinComentar() {
    this.salir.emit();
    this.comentario = '';
  }
}
