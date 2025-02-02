import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PacientesTablaComponent } from '../../components/tablas/pacientes-tabla/pacientes-tabla.component';
import { AdminTablaComponent } from '../../components/tablas/admin-tabla/admin-tabla.component';
import { EspecialistasTablaComponent } from '../../components/tablas/especialistas-tabla/especialistas-tabla.component';
import { PacienteComponent } from '../../components/registro/paciente/paciente.component';
import { EspecialistaFormComponent } from '../../components/registro/especialista-form/especialista-form.component';
import { AdminFormComponent } from '../../components/registro/admin-form/admin-form.component';
import * as XLSX from 'xlsx';
import { UsuariosTurnosComponent } from '../../components/admin/usuarios-turnos/usuarios-turnos.component';

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
    UsuariosTurnosComponent,
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent {
  usuarios: any = [];
  showCase: number = -1;

  constructor(private firestore: AngularFirestore) {}

  traerPacientes() {
    this.traerUsuarios('paciente').subscribe((usuarios) => {
      if (usuarios !== null) {
        this.usuarios = usuarios;
      }
    });
  }

  traerEspecialistas() {
    this.traerUsuarios('especialista').subscribe((usuarios) => {
      if (usuarios !== null) {
        this.usuarios = usuarios;
      }
    });
    this.showCase = 1;
  }

  traerAdmin() {
    this.traerUsuarios('admin').subscribe((usuarios) => {
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

  usuariosTurnos() {
    this.traerPacientes();
    this.showCase = 6;
  }

  descargarExcelPacientes() {
    this.traerUsuarios('paciente').subscribe((pacientes) => {
      if (pacientes !== null) {
        const formattedData = pacientes.map((paciente: any) => ({
          Apellido: paciente.apellido,
          Nombre: paciente.nombre,
          Edad: paciente.edad,
          DNI: paciente.dni,
          Mail: paciente.mail,
          'Obra Social': paciente.obraSocial,
        }));

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, 'Pacientes');

        XLSX.writeFile(wb, 'pacientes.xlsx');
      }
    });
  }
}
