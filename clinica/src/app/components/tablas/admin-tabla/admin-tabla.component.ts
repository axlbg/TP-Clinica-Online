import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-tabla',
  standalone: true,
  imports: [NgFor],
  templateUrl: './admin-tabla.component.html',
  styleUrl: '../tablas.css',
})
export class AdminTablaComponent {
  @Input() usuarios: any = [];
}
