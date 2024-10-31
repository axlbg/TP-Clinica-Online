import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutentificadorService } from '../../services/autentificador.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  correoVerificado: boolean = false;

  constructor(public auth: AutentificadorService) {}

  async ngOnInit() {
    this.correoVerificado = await this.auth.isEmailVerified();
    if (this.correoVerificado) {
      console.log('El correo está verificado');
    } else {
      console.log('El correo NO está verificado');
    }
  }
  deslogear() {
    this.auth.deslogear();
  }
}
