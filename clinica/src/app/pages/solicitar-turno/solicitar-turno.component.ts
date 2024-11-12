import { Component, Host } from '@angular/core';
import { SolicitarFormComponent } from '../../components/turnos/solicitar-form/solicitar-form.component';
import { AutentificadorService } from '../../services/autentificador.service';
import { SeleccionarPacienteComponent } from '../../components/turnos/seleccionar-paciente/seleccionar-paciente.component';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [SolicitarFormComponent, SeleccionarPacienteComponent],
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.css',
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

  constructor(
    protected auth: AutentificadorService,
    protected turnos: TurnoService
  ) {
    if (!auth.esAdmin()) this.pacienteSeleccionado = auth.objUsuario;
  }

  obtenerEspecialidad(esp: string) {
    this.especialidadSeleccionada = esp;
  }
  obtenerEspecialista(esp: any) {
    this.especialistaSeleccionado = esp;
  }
  obtenerPaciente(u: any) {
    this.pacienteSeleccionado = u;
  }
  obtenerDia(objDia: any) {
    this.objDia = objDia;
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
      pacienteId: this.pacienteSeleccionado.userId,
      fecha: this.objDia.dia,
      hora: this.objDia.hora,
      estado: 'pendiente',
    };
    this.turnos.guardarTurno(objTurno);
  }
}
