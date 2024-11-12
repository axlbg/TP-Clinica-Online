import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  constructor(private firestore: AngularFirestore) {}

  guardarTurno(turno: any) {
    const turnoId = this.firestore.createId();
    turno.turnoId = turnoId;
    return this.firestore.collection('turnos').doc(turnoId).set(turno);
  }

  traerTodosLosTurnos(): Observable<any> {
    return this.firestore.collection('turnos').valueChanges();
  }

  traerTurnosPorPaciente(pacienteId: string): Observable<any> {
    return this.firestore
      .collection('turnos', (ref) => ref.where('pacienteId', '==', pacienteId))
      .valueChanges();
  }

  traerTurnosPorEspecialista(especialistaId: string): Observable<any> {
    return this.firestore
      .collection('turnos', (ref) =>
        ref.where('especialistaId', '==', especialistaId)
      )
      .valueChanges();
  }

  actualizarTurno(id: string, datosActualizados: any): Promise<void> {
    const turnoRef = this.firestore.doc(`turnos/${id}`);
    return turnoRef.update(datosActualizados);
  }
}
