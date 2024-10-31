import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AutentificadorService } from '../../services/autentificador.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(public auth: AutentificadorService) {}
}
