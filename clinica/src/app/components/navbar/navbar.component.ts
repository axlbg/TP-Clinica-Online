import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutentificadorService } from '../../services/autentificador.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  correoVerificado: boolean = false;

  constructor(public auth: AutentificadorService) {}

  deslogear() {
    this.auth.deslogear();
  }
}
