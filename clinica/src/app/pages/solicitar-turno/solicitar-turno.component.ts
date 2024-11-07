import { Component } from '@angular/core';
import { SolicitarFormComponent } from '../../components/turnos/solicitar-form/solicitar-form.component';

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [SolicitarFormComponent],
  templateUrl: './solicitar-turno.component.html',
  styleUrl: './solicitar-turno.component.css',
})
export class SolicitarTurnoComponent {}
