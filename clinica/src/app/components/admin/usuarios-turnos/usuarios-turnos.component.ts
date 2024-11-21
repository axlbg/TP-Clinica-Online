import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TurnoService } from '../../../services/turno.service';
import { LoadingComponent } from '../../loading/loading.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-usuarios-turnos',
  standalone: true,
  imports: [NgFor, LoadingComponent],
  templateUrl: './usuarios-turnos.component.html',
  styleUrl: './usuarios-turnos.component.css',
})
export class UsuariosTurnosComponent {
  @Input() usuarios: any = [];
  isLoading = false;

  constructor(protected turnosService: TurnoService) {}

  clickUsuario(usuario: any) {
    const nombre = usuario.nombre + ' ' + usuario.apellido;
    this.isLoading = true;
    this.turnosService.traerTurnosPorPaciente(usuario.userId).subscribe(
      (data) => {
        this.isLoading = false;

        data.sort(
          (a: any, b: any) =>
            a.fecha.toDate().getTime() - b.fecha.toDate().getTime()
        );

        const formattedData = data.map((turno: any) => {
          const fechaFormateada = new Intl.DateTimeFormat('es-ES', {
            day: '2-digit',
            month: '2-digit',
          }).format(turno.fecha.toDate());

          return {
            Fecha: fechaFormateada,
            Hora: turno.hora,
            Especialidad: turno.especialidad,
            Especialista: turno.especialistaNombre,
          };
        });

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'Turnos de ' + nombre);

        XLSX.writeFile(wb, nombre + '.xlsx');
      },
      (error) => {
        console.error('Error al obtener los turnos:', error);
      }
    );
  }
}
