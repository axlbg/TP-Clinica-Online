import { CommonModule, NgFor, NgSwitch } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CapitalizarPrimerLetraPipe } from '../../../pipes/capitalizar-primer-letra.pipe';
import { LoadingComponent } from '../../loading/loading.component';
import { TurnoService } from '../../../services/turno.service';
import { ComentarioComponent } from '../comentario/comentario.component';
import { VerComentarioComponent } from '../ver-comentario/ver-comentario.component';

@Component({
  selector: 'app-listado-turnos-paciente',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    CapitalizarPrimerLetraPipe,
    NgSwitch,
    LoadingComponent,
    ComentarioComponent,
    VerComentarioComponent,
  ],
  templateUrl: './listado-turnos-paciente.component.html',
  styleUrl: './listado-turnos-paciente.component.css',
})
export class ListadoTurnosPacienteComponent {
  @Input() turnos: any = [];

  showComentarioCancelar: boolean = false;
  showVerComentario: boolean = false;
  showVerInforme: boolean = false;
  showCalificarAtencion: boolean = false;

  turnoACancelar: any;
  comentarioAMostrar: string = '';

  constructor(protected turnosService: TurnoService) {}

  accionCancelar(turno: any) {
    this.turnoACancelar = turno;
    this.showComentarioCancelar = true;
  }
  accionVerComentario(turno: any) {
    this.comentarioAMostrar = turno.comentario;
    this.showVerComentario = true;
  }
  accionVerInforme(turno: any) {
    this.comentarioAMostrar = turno.comentario;
    this.showVerInforme = true;
  }
  accionCalificarAtencion(turno: any) {
    this.comentarioAMostrar = turno.comentario;
    this.showCalificarAtencion = true;
  }
  accionCompletarEncuesta(turno: any) {}

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
    this.showVerComentario = false;
    this.showVerInforme = false;
    this.showCalificarAtencion = false;
  }
  enviarComentarioCancelar(comentario: string) {
    this.turnoACancelar.comentario = comentario;
    this.turnoACancelar.estado = 'cancelado';
    this.modificarTurno(this.turnoACancelar.turnoId, this.turnoACancelar);
    this.showComentarioCancelar = false;
  }
}
