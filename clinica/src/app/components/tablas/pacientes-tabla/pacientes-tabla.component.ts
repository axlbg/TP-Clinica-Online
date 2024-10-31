import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pacientes-tabla',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pacientes-tabla.component.html',
  styleUrl: '../tablas.css',
})
export class PacientesTablaComponent {
  @Input() usuarios: any = [];
}
