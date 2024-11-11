import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PermisoPipe } from '../../../pipes/permiso.pipe';

@Component({
  selector: 'app-especialistas-tabla',
  standalone: true,
  imports: [NgFor, PermisoPipe],
  templateUrl: './especialistas-tabla.component.html',
  styleUrl: '../tablas.css',
})
export class EspecialistasTablaComponent {
  @Input() usuarios: any = [];

  constructor(private firestore: AngularFirestore) {}

  updateUserAccess(userId: string, newAccessValue: boolean) {
    const userDocRef = this.firestore.collection('usuarios').doc(userId);

    userDocRef
      .update({ acceso: newAccessValue })
      .then(() => {
        console.log('Atributo acceso actualizado correctamente');
      })
      .catch((error) => {
        console.error('Error al actualizar el atributo acceso:', error);
      });
  }
}
