import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PacientesTablaComponent } from '../../components/tablas/pacientes-tabla/pacientes-tabla.component';
import { AdminTablaComponent } from '../../components/tablas/admin-tabla/admin-tabla.component';
import { EspecialistasTablaComponent } from '../../components/tablas/especialistas-tabla/especialistas-tabla.component';
import { PacienteComponent } from '../../components/registro/paciente/paciente.component';
import { EspecialistaFormComponent } from '../../components/registro/especialista-form/especialista-form.component';
import { AdminFormComponent } from '../../components/registro/admin-form/admin-form.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    PacientesTablaComponent,
    AdminTablaComponent,
    EspecialistasTablaComponent,
    PacienteComponent,
    EspecialistaFormComponent,
    AdminFormComponent,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  usuarios: any = [];
  showCase: number = -1;

  constructor(private firestore: AngularFirestore) {}

  traerPacientes() {
    this.usuarios = this.traerUsuarios('paciente').subscribe((usuarios) => {
      if (usuarios !== null) {
        this.usuarios = usuarios;
      }
    });
    this.showCase = 0;
  }

  traerEspecialistas() {
    this.usuarios = this.traerUsuarios('especialista').subscribe((usuarios) => {
      if (usuarios !== null) {
        this.usuarios = usuarios;
      }
    });
    this.showCase = 1;
  }

  traerAdmin() {
    this.usuarios = this.traerUsuarios('admin').subscribe((usuarios) => {
      if (usuarios !== null) {
        this.usuarios = usuarios;
      }
    });
    this.showCase = 2;
  }

  traerUsuarios(tipo: string) {
    const collection = this.firestore.collection('usuarios', (ref) =>
      ref.where('tipo', '==', tipo)
    );
    return collection.valueChanges();
  }

  registrar(n: number) {
    this.showCase = n;
  }
}
