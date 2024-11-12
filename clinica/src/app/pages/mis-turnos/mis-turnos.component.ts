import { Component } from '@angular/core';
import { ListadoTurnosPacienteComponent } from '../../components/turnos/listado-turnos-paciente/listado-turnos-paciente.component';
import { TurnoService } from '../../services/turno.service';
import { AutentificadorService } from '../../services/autentificador.service';
import { CommonModule, NgSwitch } from '@angular/common';
import { ListadoTurnosEspecialistaComponent } from '../../components/turnos/listado-turnos-especialista/listado-turnos-especialista.component';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [
    ListadoTurnosPacienteComponent,
    NgSwitch,
    CommonModule,
    ListadoTurnosEspecialistaComponent,
  ],
  templateUrl: './mis-turnos.component.html',
  styleUrl: './mis-turnos.component.css',
})
export class MisTurnosComponent {
  listaDeTurnos: any;
  objUsuario: any;

  constructor(
    private turnosService: TurnoService,
    public auth: AutentificadorService
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
        },
        (error) => {
          console.error('Error al obtener los turnos:', error);
        }
      );
  }
}
