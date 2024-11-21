import { Component } from '@angular/core';
import { ListadoTurnosAdminComponent } from '../../components/turnos/listado-turnos-admin/listado-turnos-admin.component';
import { TurnoService } from '../../services/turno.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [ListadoTurnosAdminComponent, FormsModule],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css',
})
export class TurnosComponent {
  listaDeTurnos: any;

  turnosFiltrados: any[] = [];
  term: string = '';
  constructor(protected turnosService: TurnoService) {
    this.obtenerTurnosAdmin();
  }

  obtenerTurnosAdmin(): void {
    this.turnosService.traerTodosLosTurnos().subscribe(
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
            turno.especialistaNombre.toLowerCase().includes(searchTerm))
      );
    } else {
      this.turnosFiltrados = this.listaDeTurnos;
    }
  }
}
