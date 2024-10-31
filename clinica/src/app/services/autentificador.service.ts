import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AutentificadorService {
  estaLogeado: boolean = false;
  tipoDeUsuario = '';
  accesoEspecialista = false;
  userName = '';

  constructor(
    public firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async logear(email: string, password: string) {
    try {
      const userCredential = await this.firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const userId = userCredential.user?.uid;
      if (userId) {
        const data = await this.obtenerDatosUsuario(userId);
        this.tipoDeUsuario = data.tipo;
        if (this.tipoDeUsuario == 'especialista') {
          this.accesoEspecialista = data.acceso;
        }
        this.estaLogeado = true;
        this.userName = data.mail;
      }

      return userCredential;
    } catch (error) {
      console.log('Email y/o contraseña invalidos');
      return null;
    }
  }

  async obtenerDatosUsuario(userId: string): Promise<any> {
    try {
      const userDoc = await this.firestore
        .collection('usuarios')
        .doc(userId)
        .get()
        .toPromise();
      if (userDoc?.exists) {
        return userDoc.data(); // Devuelve los datos del usuario como un objeto
      } else {
        console.log('No se encontraron datos para este usuario.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      throw error;
    }
  }

  deslogear() {
    this.estaLogeado = false;
    this.tipoDeUsuario = '';
    this.accesoEspecialista = false;
    console.log('Deslogeado');

    this.firebaseAuth.signOut();
  }

  async registrarUsuario(email: string, password: string, obj: any) {
    await this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const userId = userCredential.user?.uid;
        if (userId) {
          obj.userId = userId;

          const userDoc = this.firestore.collection('usuarios').doc(userId);
          userDoc.set(obj);
        }
        if (obj.tipo != 'admin') {
          this.sendVerificationEmail();
        }
        this.estaLogeado = true;

        this.userName = obj.mail;
        this.tipoDeUsuario = obj.tipo;
      })
      .catch((error: any) => {
        throw error;
      });
  }

  registrarPaciente(p: any) {
    let obj = {
      tipo: 'paciente',
      nombre: p.nombre,
      apellido: p.apellido,
      edad: p.edad,
      dni: p.dni,
      obraSocial: p.obraSocial,
      mail: p.mail,
    };
    this.registrarUsuario(p.mail, p.password, obj);
  }

  registrarEspecialista(p: any) {
    let obj = {
      tipo: 'especialista',
      nombre: p.nombre,
      apellido: p.apellido,
      edad: p.edad,
      dni: p.dni,
      especialidad: p.especialidad,
      mail: p.mail,
      acceso: false,
    };
    this.registrarUsuario(p.mail, p.password, obj);
  }

  registrarAdmin(p: any) {
    let obj = {
      tipo: 'admin',
      nombre: p.nombre,
      apellido: p.apellido,
      edad: p.edad,
      dni: p.dni,
      obraSocial: p.obraSocial,
      mail: p.mail,
    };
    this.registrarUsuario(p.mail, p.password, obj);
  }

  esAdmin() {
    if (this.tipoDeUsuario == 'admin') return true;
    return false;
  }

  async sendVerificationEmail() {
    const user = await this.firebaseAuth.currentUser;
    if (user) {
      await user.sendEmailVerification();
      console.log(
        'Se ha enviado un correo de verificación. Verifica tu correo.'
      );
    }
  }
  async isEmailVerified(): Promise<boolean> {
    const user = await this.firebaseAuth.currentUser;
    if (user) {
      await user.reload();
      return user.emailVerified;
    }
    return false;
  }
}
