import { Component } from '@angular/core';
import { HistoriaClinicaService } from '../../services/historia-clinica.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgFor } from '@angular/common';
import { TablaHistoriaClinicaComponent } from '../../components/historia-clinica/tabla-historia-clinica/tabla-historia-clinica.component';
import { TurnoService } from '../../services/turno.service';
import { AutentificadorService } from '../../services/autentificador.service';
import { authInstance$ } from '@angular/fire/auth';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [NgFor, TablaHistoriaClinicaComponent],
  templateUrl: './pacientes.component.html',
  styleUrl: './pacientes.component.css',
})
export class PacientesComponent {
  usuarios: any[] = [];
  showHistoriaClinica: boolean = false;
  historiaClinica: any;
  listaDeTurnos: any;

  constructor(
    protected hcService: HistoriaClinicaService,
    protected turnosService: TurnoService,
    protected auth: AutentificadorService
  ) {
    this.obtenerTurnos();
  }

  async verHistoriaClinica(pacienteUserId: string) {
    this.showHistoriaClinica = true;
    this.hcService.generarHistoriaClinica(pacienteUserId).subscribe(
      (historiaPaciente) => {
        this.historiaClinica = historiaPaciente;
      },
      (error) => {
        console.error('error:', error);
      }
    );
  }

  salir() {
    this.showHistoriaClinica = false;
  }

  obtenerTurnos(): void {
    this.turnosService.traerTodosLosTurnos().subscribe(
      (data) => {
        this.usuarios = Array.from(
          data
            .filter((t: any) => t.especialistaId === this.auth.userId)
            .reduce((map: Map<string, any>, turno: any) => {
              if (!map.has(turno.pacienteId)) {
                map.set(turno.pacienteId, {
                  userId: turno.pacienteId,
                  nombre: turno.pacienteNombre,
                  imagen: turno.pacienteImagen,
                });
              }
              return map;
            }, new Map())
            .values()
        );
      },
      (error) => {
        console.error('Error al obtener los turnos:', error);
      }
    );
  }
}
