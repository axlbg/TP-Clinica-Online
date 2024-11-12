import { Component } from '@angular/core';
import { ListadoTurnosAdminComponent } from '../../components/turnos/listado-turnos-admin/listado-turnos-admin.component';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [ListadoTurnosAdminComponent],
  templateUrl: './turnos.component.html',
  styleUrl: './turnos.component.css',
})
export class TurnosComponent {
  listaDeTurnos: any;

  constructor(protected turnosService: TurnoService) {
    this.obtenerTurnosAdmin();
  }

  obtenerTurnosAdmin(): void {
    this.turnosService.traerTodosLosTurnos().subscribe(
      (data) => {
        this.listaDeTurnos = data;
      },
      (error) => {
        console.error('Error al obtener los turnos:', error);
      }
    );
  }
}
