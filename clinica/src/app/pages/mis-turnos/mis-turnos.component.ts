import { Component } from '@angular/core';
import { ListadoTurnosPacienteComponent } from '../../components/turnos/listado-turnos-paciente/listado-turnos-paciente.component';
import { TurnoService } from '../../services/turno.service';
import { AutentificadorService } from '../../services/autentificador.service';
import { CommonModule, NgSwitch } from '@angular/common';
import { ListadoTurnosEspecialistaComponent } from '../../components/turnos/listado-turnos-especialista/listado-turnos-especialista.component';
import { FormsModule } from '@angular/forms';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [
    ListadoTurnosPacienteComponent,
    NgSwitch,
    CommonModule,
    ListadoTurnosEspecialistaComponent,
    FormsModule,
  ],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css',
})
export class MisTurnosComponent {
  objUsuario: any;

  listaDeTurnos: any[] = [];
  turnosFiltrados: any[] = [];
  term: string = '';
  constructor(
    private turnosService: TurnoService,
    public auth: AutentificadorService,
    protected hcService: HistoriaClinicaService
  ) {
    this.objUsuario = auth.objUsuario;

    if (auth.tipoDeUsuario == 'paciente') this.obtenerTurnosDelPaciente();
    else if (auth.tipoDeUsuario == 'especialista')
      this.obtenerTurnosDelEspecialista();
  }

  obtenerTurnosDelPaciente(): void {
    this.turnosService.traerTurnosPorPaciente(this.objUsuario.userId).subscribe(
      (data) => {
        this.listaDeTurnos = data;
        this.listaDeTurnos.sort(
          (a: any, b: any) =>
            a.fecha.toDate().getTime() - b.fecha.toDate().getTime()
        );
        this.turnosFiltrados = this.listaDeTurnos;
      },
      (error) => {
        console.error('Error al obtener los turnos:', error);
      }
    );
  }

  obtenerTurnosDelEspecialista(): void {
    this.turnosService
      .traerTurnosPorEspecialista(this.objUsuario.userId)
      .subscribe(
        (data) => {
          this.listaDeTurnos = data;
          this.listaDeTurnos.sort(
            (a: any, b: any) =>
              a.fecha.toDate().getTime() - b.fecha.toDate().getTime()
          );
          this.turnosFiltrados = this.listaDeTurnos;
        },
        (error) => {
          console.error('Error al obtener los turnos:', error);
        }
      );
  }

  filtrarTurnos() {
    const searchTerm = this.term.toLowerCase().trim();
    if (searchTerm) {
      this.turnosFiltrados = this.listaDeTurnos.filter(
        (turno: any) =>
          (turno.especialidad &&
            turno.especialidad.toLowerCase().includes(searchTerm)) ||
          (turno.especialistaNombre &&
            turno.especialistaNombre.toLowerCase().includes(searchTerm)) ||
          (turno.pacienteNombre &&
            turno.pacienteNombre.toLowerCase().includes(searchTerm)) ||
          (turno.historiaClinica &&
            Object.keys(turno.historiaClinica).includes(searchTerm))
      );
    } else {
      this.turnosFiltrados = this.listaDeTurnos;
    }
  }
}
