import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  imports: [NgFor, NgIf, DiaYHorarioComponent, CommonModule],
  templateUrl: './solicitar-form.component.html',
  styleUrl: './solicitar-form.component.css',
})
export class SolicitarFormComponent {
  especialidadesDefault = [
    'Neurólogo',
    'Cardiólogo',
    'Hematólogo',
    'Odontólogo',
  ];

  showForm = 0;
  fecha: any;
  disponibilidad: { [key in DiaSemana]: string[] } = {
    lunes: ['08:00', '09:00', '12:00'],
    martes: ['08:00', '09:00', '10:00', '11:00', '12:00'],
    miércoles: ['08:00'],
    jueves: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
    viernes: ['09:00'],
    sábado: ['08:00', '09:00'],
  };
  especialidades: any = [];
  usuarios: any = [];

  @Output() especialidadSeleccionada = new EventEmitter<string>();
  @Output() especialistaSeleccionado = new EventEmitter<string>();
  @Output() objDia = new EventEmitter<any>();

  constructor(private firestore: AngularFirestore) {
    this.filtrarEspecialidades();
    this.showForm = 0;
  }

  obtenerImg(especialidad: string) {
    let ruta = '/especialidades/';
    if (this.especialidadesDefault.includes(especialidad))
      ruta += especialidad + '.jpg';
    else ruta += 'generico.jpg';
    return ruta;
  }

  onClickEspecialidad(especialidadSeleccionada: string): void {
    this.traerEspecialistasPorEspecialidad(especialidadSeleccionada).subscribe(
      (usuarios) => {
        if (usuarios != null) {
          this.usuarios = usuarios;
        }
      }
    );
    this.especialidadSeleccionada.emit(especialidadSeleccionada);
    this.showForm++;
  }

  onClickEspecialista(especialistaSeleccionado: any) {
    this.disponibilidad = especialistaSeleccionado.disponibilidad;
    this.especialistaSeleccionado.emit(especialistaSeleccionado);
    this.showForm++;
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

  obtenerDiaYHorario(objDia: any) {
    console.log('Turno seleccionado:', objDia);
    this.fecha = objDia.dia;

    this.objDia.emit(objDia);
  }
}
