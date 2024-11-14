import { Component, Input } from '@angular/core';
import { LoadingComponent } from '../../loading/loading.component';
import { VerComentarioComponent } from '../ver-comentario/ver-comentario.component';
import { TurnoService } from '../../../services/turno.service';
import { CommonModule, NgFor, NgSwitch } from '@angular/common';
import { ComentarioComponent } from '../comentario/comentario.component';
import { CapitalizarPrimerLetraPipe } from '../../../pipes/capitalizar-primer-letra.pipe';
import { CargarHistoriaClinicaFormComponent } from '../../historia-clinica/cargar-historia-clinica-form/cargar-historia-clinica-form.component';

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
    CargarHistoriaClinicaFormComponent,
  ],
  templateUrl: './listado-turnos-especialista.component.html',
  styleUrl: './listado-turnos-especialista.component.css',
})
export class ListadoTurnosEspecialistaComponent {
  @Input() turnos: any = [];

  showComentarioCancelar: boolean = false;
  showVerComentario: boolean = false;
  showVerInforme: boolean = false;
  showComentarioRechazar: boolean = false;
  showComentarioFinalizar: boolean = false;

  turnoSeleccionado: any;
  comentarioAMostrar: string = '';

  constructor(protected turnosService: TurnoService) {}

  ocultarTodo() {
    this.showComentarioCancelar = false;
    this.showVerComentario = false;
    this.showVerInforme = false;
    this.showComentarioRechazar = false;
    this.showComentarioFinalizar = false;
  }

  accionCancelar(turno: any) {
    this.turnoSeleccionado = turno;
    this.showComentarioCancelar = true;
  }

  accionAceptar(turno: any) {
    turno.estado = 'aceptado';
    this.modificarTurno(turno.turnoId, turno);
  }

  accionRechazar(turno: any) {
    this.turnoSeleccionado = turno;
    this.showComentarioRechazar = true;
  }
  accionVerInforme(turno: any) {
    this.comentarioAMostrar = turno.informe;
    this.showVerInforme = true;
  }
  accionFinalizar(turno: any) {
    this.turnoSeleccionado = turno;
    this.showComentarioFinalizar = true;
  }
  accionVerComentario(turno: any) {
    this.showVerComentario = true;
    this.comentarioAMostrar = turno.comentario;
  }

  enviarComentarioCancelar(comentario: string) {
    this.turnoSeleccionado.comentario = comentario;
    this.turnoSeleccionado.estado = 'cancelado';
    this.modificarTurno(this.turnoSeleccionado.turnoId, this.turnoSeleccionado);
    this.showComentarioCancelar = false;
  }

  enviarComentarioRechazar(comentario: string) {
    this.turnoSeleccionado.comentario = comentario;
    this.turnoSeleccionado.estado = 'rechazado';
    this.modificarTurno(this.turnoSeleccionado.turnoId, this.turnoSeleccionado);
    this.showComentarioRechazar = false;
  }

  /*  enviarComentarioFinalizar(comentario: string, historiaClinica: any) {
    this.turnoSeleccionado.informe = comentario;
    this.turnoSeleccionado.estado = 'finalizado';
    this.modificarTurno(this.turnoSeleccionado.turnoId, this.turnoSeleccionado);
    this.showComentarioFinalizar = false;
  }*/
  submitFinalizar(datos: { comentario: string; historiaClinica: any }) {
    this.turnoSeleccionado.informe = datos.comentario;
    this.turnoSeleccionado.historiaClinica = datos.historiaClinica;
    this.turnoSeleccionado.estado = 'finalizado';
    this.modificarTurno(this.turnoSeleccionado.turnoId, this.turnoSeleccionado);
    this.showComentarioFinalizar = false;
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
