import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormatearHoraPipe } from '../../../pipes/formatear-hora.pipe';

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
  imports: [NgIf, NgFor, CommonModule, FormatearHoraPipe],
  templateUrl: './dia-yhorario.component.html',
  styleUrl: './dia-yhorario.component.css',
})
export class DiaYHorarioComponent implements OnInit {
  @Output() diaYHorario = new EventEmitter<any>();

  proximosDiasConHorarios: { fecha: Date; horarios: string[] }[] = [];
  diaSeleccionado: { fecha: Date; horarios: string[] } = {
    fecha: new Date(),
    horarios: [''],
  };

  showHorarios: boolean = false;

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
    const proximosDias = this.generarProximos15Dias();
    this.proximosDiasConHorarios = this.filtrarDisponibilidad(
      proximosDias,
      this.disponibilidad
    );
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

  ordenarHorarios() {
    this.diaSeleccionado.horarios.sort((a: string, b: string) => {
      const [hourA, minuteA] = a.split(':').map(Number);
      const [hourB, minuteB] = b.split(':').map(Number);
      return hourA - hourB || minuteA - minuteB;
    });
  }

  seleccionarTurno(dia: Date, horario: string) {
    this.diaYHorario.emit({ dia: dia, hora: horario }); /*
    const nombreDia = this.getNombreDia(dia);
    if (this.disponibilidad[nombreDia]) {
      const indice = this.disponibilidad[nombreDia].indexOf(horario);

      if (indice !== -1) {
        const diaYHorario: { [key in DiaSemana]?: string[] } = {
          [nombreDia]: [horario],
        };
        this.diaYHorario.emit({ diaYHorario: diaYHorario, dia: dia });
        //  console.log(diaYHorario);
      } else {
        console.log(`El turno ${horario} no está disponible en ${nombreDia}.`);
      }
    } else {
      console.log(
        `El día ${nombreDia} no está registrado en la disponibilidad.`
      );
    }*/
  }
  /*
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
    return dias[fecha.getDay()] as DiaSemana;
  }*/

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
