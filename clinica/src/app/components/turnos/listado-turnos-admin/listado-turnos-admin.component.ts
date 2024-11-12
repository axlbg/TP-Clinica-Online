import { CommonModule, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComentarioComponent } from '../comentario/comentario.component';
import { TurnoService } from '../../../services/turno.service';
import { CapitalizarPrimerLetraPipe } from '../../../pipes/capitalizar-primer-letra.pipe';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-listado-turnos-admin',
  standalone: true,
  imports: [
    NgIf,
    ComentarioComponent,
    CapitalizarPrimerLetraPipe,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './listado-turnos-admin.component.html',
  styleUrl: './listado-turnos-admin.component.css',
})
export class ListadoTurnosAdminComponent {
  @Input() turnos: any = [];
  showComentarioCancelar: boolean = false;
  turnoACancelar: any;

  constructor(protected turnosService: TurnoService) {}

  accionCancelar(turno: any) {
    this.turnoACancelar = turno;
    this.showComentarioCancelar = true;
  }

  modificarTurno(turnoId: string, data: any): void {
    this.turnosService
      .actualizarTurno(turnoId, data)
      .then(() => {
        console.log('Turno actualizado correctamente');
      })
      .catch((error) => {
        console.error('Error al actualizar el turno:', error);
      });
  }

  ocultarTodo() {
    this.showComentarioCancelar = false;
  }
  enviarComentarioCancelar(comentario: string) {
    this.turnoACancelar.comentario = comentario;
    this.turnoACancelar.estado = 'cancelado';
    this.modificarTurno(this.turnoACancelar.turnoId, this.turnoACancelar);
    this.showComentarioCancelar = false;
  }
}
