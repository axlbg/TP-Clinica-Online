import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HistoriaClinicaService } from '../../../services/historia-clinica.service';
import { TablaHistoriaClinicaComponent } from '../../historia-clinica/tabla-historia-clinica/tabla-historia-clinica.component';

@Component({
  selector: 'app-pacientes-tabla',
  standalone: true,
  imports: [NgFor, TablaHistoriaClinicaComponent],
  templateUrl: './pacientes-tabla.component.html',
  styleUrls: ['./pacientes-tabla.component.css', '../tablas.css'],
})
export class PacientesTablaComponent {
  @Input() usuarios: any = [];
  showHistoriaClinica: boolean = false;
  historiaClinica: any;

  constructor(protected hcService: HistoriaClinicaService) {}

  async verHistoriaClinica(paciente: any) {
    this.showHistoriaClinica = true;
    this.hcService.generarHistoriaClinica(paciente.userId).subscribe(
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
}
