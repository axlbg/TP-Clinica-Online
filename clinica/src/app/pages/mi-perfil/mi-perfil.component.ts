import { Component } from '@angular/core';
import { AutentificadorService } from '../../services/autentificador.service';
import { NgFor, NgIf } from '@angular/common';
import { CapitalizarPrimerLetraPipe } from '../../pipes/capitalizar-primer-letra.pipe';
import { DisponibilidadEspecialistaComponent } from '../../components/perfil/disponibilidad-especialista/disponibilidad-especialista.component';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CapitalizarPrimerLetraPipe,
    DisponibilidadEspecialistaComponent,
  ],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css',
})
export class MiPerfilComponent {
  user: any = {};
  showHorarios = false;

  constructor(private auth: AutentificadorService) {
    this.user = auth.objUsuario;
  }

  clickAdminisitrarHorario() {
    this.showHorarios = true;
  }
}
