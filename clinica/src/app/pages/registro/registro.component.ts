import { Component } from '@angular/core';
import { PacienteComponent } from '../../components/registro/paciente/paciente.component';
import { EspecialistaFormComponent } from '../../components/registro/especialista-form/especialista-form.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [PacienteComponent, EspecialistaFormComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  animations: [
    trigger('rotate', [
      // Creamos la animación 'rotate'
      state('normal', style({ transform: 'rotate(0deg)' })), // Definimos el estado 'normal' con rotación 0 grados
      state('rotate', style({ transform: 'rotate(360deg)' })), // Definimos el estado 'rotate' con rotación 360
      transition('normal => rotate', [animate('1s ease-in-out')]), // Transición de 'normal' a 'rotate' con duración    de 1 segundo
      transition('rotate => normal', [animate('1s ease-in-out')]), // Transición de 'rotate' a 'normal' con duración
    ]),
  ],
})
export class RegistroComponent {
  mostrarForm = 0;
  imgPaciente = '/paciente.png';
  imgEspecialista = '/especialista.png';

  isRotate = false;

  constructor() {}
}
