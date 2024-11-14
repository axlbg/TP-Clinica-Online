import { Injectable } from '@angular/core';
import { TurnoService } from './turno.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HistoriaClinicaService {
  constructor(protected turnosService: TurnoService) {}

  obtenerTurnosDelPaciente(userId: string): Observable<any> {
    return this.turnosService.traerTurnosPorPaciente(userId); // Asegúrate de que esta función también devuelva un Observable
  }

  generarHistoriaClinica(userId: string): Observable<any> {
    return new Observable((observer) => {
      this.obtenerTurnosDelPaciente(userId).subscribe(
        (turnos) => {
          let historiaPaciente: any = [];

          turnos.forEach((t: any) => {
            if (t.historiaClinica) {
              historiaPaciente.push({
                ...t.historiaClinica,
                fecha: t.fecha,
                especialidad: t.especialidad,
                especialista: t.especialistaNombre,
              });
            }
          });

          observer.next(historiaPaciente);
          observer.complete();
        },
        (error) => {
          console.error('Error al obtener los turnos:', error);
          observer.error(error);
        }
      );
    });
  }
}
