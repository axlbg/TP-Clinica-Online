import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

type DiaSemana =
  | 'lunes'
  | 'martes'
  | 'miércoles'
  | 'jueves'
  | 'viernes'
  | 'sábado';

@Component({
  selector: 'app-dia-yhorario',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './dia-yhorario.component.html',
  styleUrl: './dia-yhorario.component.css',
})
export class DiaYHorarioComponent implements OnInit {
  @Output() diaYHorario = new EventEmitter<any>();

  proximosDiasConHorarios: { fecha: Date; horarios: string[] }[] = [];

  @Input() disponibilidad: { [key in DiaSemana]: string[] } = {
    lunes: ['08:00', '09:00', '10:00', '11:00', '12:00'],
    martes: ['08:00', '09:00', '10:00', '11:00', '12:00'],
    miércoles: ['08:00', '09:00', '10:00', '11:00', '12:00'],
    jueves: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
    viernes: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
    sábado: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
  };

  constructor() {}

  ngOnInit() {
    // Supongamos que la disponibilidad del especialista está cargada en el componente

    // Genera los próximos 15 días y filtra la disponibilidad
    const proximosDias = this.generarProximos15Dias();
    this.proximosDiasConHorarios = this.filtrarDisponibilidad(
      proximosDias,
      this.disponibilidad
    );
  }

  getNombreDia(fecha: Date): DiaSemana {
    const dias = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    return dias[fecha.getDay()] as DiaSemana; // Aseguramos que es un valor válido de DiaSemana
  }

  // Función para seleccionar y remover el turno
  seleccionarTurno(dia: Date, horario: string) {
    const nombreDia = this.getNombreDia(dia); // Convierte la fecha a nombre de día
    // Verifica si el día existe en el objeto de disponibilidad
    if (this.disponibilidad[nombreDia]) {
      // Encuentra el índice del horario en el array correspondiente al día
      const indice = this.disponibilidad[nombreDia].indexOf(horario);

      if (indice !== -1) {
        const diaYHorario: { [key in DiaSemana]?: string[] } = {
          [nombreDia]: [horario], // Usamos el valor de nombreDia como clave
        };
        this.diaYHorario.emit({ diaYHorario: diaYHorario, dia: dia });
        console.log(diaYHorario);
      } else {
        console.log(`El turno ${horario} no está disponible en ${nombreDia}.`);
      }
    } else {
      console.log(
        `El día ${nombreDia} no está registrado en la disponibilidad.`
      );
    }
  }

  generarProximos15Dias(): Date[] {
    const diasDisponibles: Date[] = [];
    const hoy = new Date();

    for (let i = 1; i < 15; i++) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      diasDisponibles.push(fecha);
    }

    return diasDisponibles;
  }

  filtrarDisponibilidad(
    dias: Date[],
    disponibilidad: any
  ): { fecha: Date; horarios: string[] }[] {
    const diasConDisponibilidad = dias.map((dia) => {
      const diaSemana = this.obtenerDiaSemana(dia); // Obtiene el día de la semana
      const horarios = disponibilidad[diaSemana.toLowerCase()]; // Filtra según la disponibilidad

      return horarios ? { fecha: dia, horarios } : null;
    });

    return diasConDisponibilidad.filter((dia) => dia !== null);
  }

  // Obtiene el nombre del día de la semana (lunes, martes, etc.)
  private obtenerDiaSemana(fecha: Date): string {
    const diasSemana = [
      'domingo',
      'lunes',
      'martes',
      'miércoles',
      'jueves',
      'viernes',
      'sábado',
    ];
    return diasSemana[fecha.getDay()];
  }
}
