import { Component } from '@angular/core';
import { PacienteComponent } from '../../components/registro/paciente/paciente.component';
import { EspecialistaFormComponent } from '../../components/registro/especialista-form/especialista-form.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [PacienteComponent, EspecialistaFormComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  mostrarForm = 0;

  constructor() {}
}
