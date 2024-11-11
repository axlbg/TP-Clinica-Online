import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private firestore: AngularFirestore) {}

  traerUsuarios(tipo: string) {
    const collection = this.firestore.collection('usuarios', (ref) =>
      ref.where('tipo', '==', tipo)
    );
    return collection.valueChanges();
  }
}
