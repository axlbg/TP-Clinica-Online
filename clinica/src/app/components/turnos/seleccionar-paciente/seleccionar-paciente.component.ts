import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-seleccionar-paciente',
  standalone: true,
  imports: [NgFor],
  templateUrl: './seleccionar-paciente.component.html',
  styleUrl: './seleccionar-paciente.component.css',
})
export class SeleccionarPacienteComponent {
  usuarios: any = [];
  @Output() paciente = new EventEmitter<Object>();

  constructor(private users: UsuariosService) {
    this.traerPacientes();
  }

  traerPacientes() {
    this.users.traerUsuarios('paciente').subscribe((usuarios) => {
      if (usuarios !== null) {
        this.usuarios = usuarios;
      }
    });
  }

  clickUsuario(u: any) {
    this.paciente.emit(u);
  }
}
