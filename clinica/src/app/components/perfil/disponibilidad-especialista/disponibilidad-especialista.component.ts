import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CapitalizarPrimerLetraPipe } from '../../../pipes/capitalizar-primer-letra.pipe';
import { AutentificadorService } from '../../../services/autentificador.service';
import { ThisReceiver } from '@angular/compiler';

type DiaSemana =
  | 'lunes'
  | 'martes'
  | 'miércoles'
  | 'jueves'
  | 'viernes'
  | 'sábado';

@Component({
  selector: 'app-disponibilidad-especialista',
  standalone: true,
  imports: [NgClass, NgFor, CapitalizarPrimerLetraPipe],
  templateUrl: './disponibilidad-especialista.component.html',
  styleUrl: './disponibilidad-especialista.component.css',
})
export class DisponibilidadEspecialistaComponent {
  colorsin = true;

  semana: DiaSemana[] = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ];

  horariosDeAtencion: { [key in DiaSemana]: string[] } = {
    lunes: [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ],
    martes: [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ],
    miércoles: [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ],
    jueves: [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ],
    viernes: [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
    ],
    sábado: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
  };

  disponibilidad: { [key in DiaSemana]: string[] } = {
    lunes: ['10:00'],
    martes: [],
    miércoles: [],
    jueves: [],
    viernes: [],
    sábado: [],
  };

  user: any = {};

  constructor(private auth: AutentificadorService) {
    console.log(this.disponibilidad);
    this.user = auth.objUsuario;
    this.disponibilidad = this.user.disponibilidad;
  }

  clickTurno(dia: DiaSemana, horario: string) {
    if (this.estaSeleccionado(dia, horario)) {
      this.disponibilidad[dia] = this.disponibilidad[dia].filter(
        (h) => h !== horario
      );
    } else {
      this.disponibilidad[dia].push(horario);
    }
  }
  estaSeleccionado(dia: DiaSemana, horario: string) {
    return this.disponibilidad[dia].includes(horario);
  }
}
