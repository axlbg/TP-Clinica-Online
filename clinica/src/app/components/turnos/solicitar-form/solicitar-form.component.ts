import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DiaYHorarioComponent } from '../dia-yhorario/dia-yhorario.component';

type DiaSemana =
  | 'lunes'
  | 'martes'
  | 'miércoles'
  | 'jueves'
  | 'viernes'
  | 'sábado';

@Component({
  selector: 'app-solicitar-form',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule,
    NgIf,
    DiaYHorarioComponent,
    CommonModule,
  ],
  templateUrl: './solicitar-form.component.html',
  styleUrl: './solicitar-form.component.css',
})
export class SolicitarFormComponent {
  turnoForm: FormGroup;
  showDiaYHorario = false;
  diaYhorario = null;
  fecha: any;
  disponibilidad: { [key in DiaSemana]: string[] } = {
    lunes: ['08:00', '09:00', '12:00'],
    martes: ['08:00', '09:00', '10:00', '11:00', '12:00'],
    miércoles: ['08:00'],
    jueves: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
    viernes: ['08:00'],
    sábado: ['08:00', '09:00'],
  };

  onEspecialidadChange(): void {
    const especialidadSeleccionada = this.turnoForm.get('especialidad')?.value;
    this.traerEspecialistasPorEspecialidad(especialidadSeleccionada).subscribe(
      (usuarios) => {
        if (usuarios != null) {
          this.usuarios = usuarios;
        }
      }
    );
  }

  especialidades: any = [];
  usuarios: any = [];

  constructor(private firestore: AngularFirestore, private fb: FormBuilder) {
    this.filtrarEspecialidades();
    this.turnoForm = this.fb.group({
      especialidad: ['', Validators.required],
      especialista: ['', Validators.required],
    });
  }

  traerEspecialistas() {
    const collection = this.firestore.collection<any>('usuarios', (ref) =>
      ref.where('tipo', '==', 'especialista')
    );
    return collection.valueChanges();
  }

  filtrarEspecialidades() {
    this.traerEspecialistas().subscribe((usuarios) => {
      if (usuarios !== null) {
        usuarios.forEach((u) => {
          u.especialidad.forEach((especialidad: string) => {
            if (!this.especialidades.includes(especialidad)) {
              this.especialidades.push(especialidad);
            }
          });
        });
      }
    });
  }

  traerEspecialistasPorEspecialidad(especialidad: string) {
    const collection = this.firestore.collection('usuarios', (ref) =>
      ref.where('especialidad', 'array-contains', especialidad)
    );
    return collection.valueChanges();
  }

  clickElegirDia() {
    this.showDiaYHorario = !this.showDiaYHorario;
  }

  obtenerDiaYHorario(objDia: any) {
    console.log('Turno seleccionado:', objDia.diaYHorario);
    this.diaYhorario = objDia.diaYHorario;
    this.showDiaYHorario = false;
    this.fecha = objDia.dia;
  }
}
