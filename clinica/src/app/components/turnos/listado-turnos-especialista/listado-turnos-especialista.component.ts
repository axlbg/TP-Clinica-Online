import { Component, Input } from '@angular/core';
import { LoadingComponent } from '../../loading/loading.component';
import { VerComentarioComponent } from '../ver-comentario/ver-comentario.component';
import { TurnoService } from '../../../services/turno.service';
import { CommonModule, NgFor, NgSwitch } from '@angular/common';
import { ComentarioComponent } from '../comentario/comentario.component';
import { CapitalizarPrimerLetraPipe } from '../../../pipes/capitalizar-primer-letra.pipe';

@Component({
  selector: 'app-listado-turnos-especialista',
  standalone: true,
  imports: [
    LoadingComponent,
    VerComentarioComponent,
    NgFor,
    ComentarioComponent,
    NgSwitch,
    CommonModule,
    CapitalizarPrimerLetraPipe,
  ],
  templateUrl: './listado-turnos-especialista.component.html',
  styleUrl: './listado-turnos-especialista.component.css',
})
export class ListadoTurnosEspecialistaComponent {
  @Input() turnos: any = [];

  showComentarioCancelar: boolean = false;
  showVerComentario: boolean = false;
  showVerInforme: boolean = false;

  turnoACancelar: any;
  comentarioAMostrar: string = '';

  constructor(protected turnosService: TurnoService) {}

  ocultarTodo() {
    this.showComentarioCancelar = false;
    this.showVerComentario = false;
    this.showVerInforme = false;
  }
  accionRechazar(turno: any) {}
  accionAceptar(turno: any) {}
  accionVerInforme(turno: any) {}
  accionCancelar(turno: any) {}
  accionFinalizar(turno: any) {}
  accionVerComentario(turno: any) {}

  enviarComentarioCancelar(comentario: string) {
    this.turnoACancelar.comentario = comentario;
    this.turnoACancelar.estado = 'cancelado';
    this.modificarTurno(this.turnoACancelar.turnoId, this.turnoACancelar);
    this.showComentarioCancelar = false;
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
}
