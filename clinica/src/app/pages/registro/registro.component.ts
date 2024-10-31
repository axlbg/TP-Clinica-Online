import { Component } from '@angular/core';
import { PacienteComponent } from '../../components/registro/paciente/paciente.component';
import { EspecialistaFormComponent } from '../../components/registro/especialista-form/especialista-form.component';
import { AutentificadorService } from '../../services/autentificador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [PacienteComponent, EspecialistaFormComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  mostrarForm = 0;

  constructor(
    private autentificador: AutentificadorService,
    private ruteador: Router
  ) {}
}
