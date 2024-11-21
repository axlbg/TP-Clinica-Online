import { Component, Host } from '@angular/core';
import { SolicitarFormComponent } from '../../components/turnos/solicitar-form/solicitar-form.component';
import { AutentificadorService } from '../../services/autentificador.service';
import { SeleccionarPacienteComponent } from '../../components/turnos/seleccionar-paciente/seleccionar-paciente.component';
import { TurnoService } from '../../services/turno.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [SolicitarFormComponent, SeleccionarPacienteComponent],
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.css',
  animations: [
    trigger('flip', [
      // Creamos la animación 'flip'
      state('normal', style({ transform: 'perspective(600px) rotateY(0deg)' })), // Definimos el estado 'normal'
      state('flip', style({ transform: 'perspective(600px) rotateY(360deg)' })), // Definimos el estado 'flip' co
      transition('normal <=> flip', [animate('0.6s ease-in-out')]), // Transición entre 'normal' y 'flip' con duración
    ]),
  ],
})
export class SolicitarTurnoComponent {
  especialidadSeleccionada: string = '';
  especialistaSeleccionado: any = null;
  objDia: any = null;
  especialidadesDefault = [
    'Neurólogo',
    'Cardiólogo',
    'Hematólogo',
    'Odontólogo',
  ];
  pacienteSeleccionado: any = null;
  showLeftSection: boolean = false;

  isFlip = false; // Controla 'flip' para voltear el elemento.

  constructor(
    protected auth: AutentificadorService,
    protected turnos: TurnoService,
    private router: Router
  ) {
    if (!auth.esAdmin()) this.pacienteSeleccionado = auth.objUsuario;
  }

  obtenerEspecialidad(esp: string) {
    this.especialidadSeleccionada = esp;
    this.showLeftSection = true;
  }
  obtenerEspecialista(esp: any) {
    this.especialistaSeleccionado = esp;
  }
  obtenerPaciente(u: any) {
    this.pacienteSeleccionado = u;
  }
  obtenerDia(objDia: any) {
    this.objDia = objDia;
    this.isFlip = !this.isFlip;
  }

  obtenerImg(especialidad: string) {
    let ruta = '/especialidades/';
    if (this.especialidadesDefault.includes(especialidad))
      ruta += especialidad + '.jpg';
    else ruta += 'generico.jpg';
    return ruta;
  }

  confirmar() {
    const objTurno = {
      especialidad: this.especialidadSeleccionada,
      especialistaId: this.especialistaSeleccionado.userId,
      especialistaNombre: `${this.especialistaSeleccionado.nombre} ${this.especialistaSeleccionado.apellido}`,
      pacienteNombre: this.auth.userName,
      pacienteId: this.pacienteSeleccionado.userId,
      pacienteImagen: this.pacienteSeleccionado.imagen,
      fecha: this.objDia.dia,
      hora: this.objDia.hora,
      estado: 'pendiente',
    };
    this.turnos.guardarTurno(objTurno);
    this.router.navigate(['/misturnos']);
  }
}
