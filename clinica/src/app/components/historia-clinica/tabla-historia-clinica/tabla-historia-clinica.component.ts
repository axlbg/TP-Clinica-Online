import { CommonModule, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabla-historia-clinica',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './tabla-historia-clinica.component.html',
  styleUrl: './tabla-historia-clinica.component.css',
})
export class TablaHistoriaClinicaComponent {
  @Input() historiaClinica: any;
  constructor() {}
}
