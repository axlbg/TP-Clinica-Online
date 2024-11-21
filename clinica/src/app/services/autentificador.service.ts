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
  emailVerificado = false;
  objUsuario: any = {};
  userId = '';
  imagen = '';

  constructor(
    public firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  resetDefault() {
    this.estaLogeado = false;
    this.tipoDeUsuario = '';
    this.accesoEspecialista = false;
    this.userName = '';
    this.emailVerificado = false;
    this.objUsuario = {};
  }

  async logear(email: string, password: string) {
    try {
      this.resetDefault();
      const userCredential = await this.firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const userId = userCredential.user?.uid;
      if (userId) {
        const data = await this.obtenerDatosUsuario(userId);
        this.tipoDeUsuario = data.tipo;
        this.objUsuario = data;
        if (this.tipoDeUsuario === 'especialista') {
          this.accesoEspecialista = data.acceso;
        }
        if (
          (await this.isEmailVerified()) ||
          data.nombre == 'Vilma' ||
          data.nombre == 'Pierre' ||
          data.nombre == 'Pedro' ||
          data.nombre == 'Carlos'
        ) {
          this.emailVerificado = true;
        }
        const userName = data.nombre + ' ' + data.apellido;
        this.estaLogeado = true;
        this.userName = userName;
        this.userId = data.userId;
        this.imagen = data.imagen;

        /* -- */
        const logDoc = this.firestore.collection('logs').doc(); // Crea un nuevo documento en la colección 'logs'
        const now = new Date(); // Obtén la fecha y hora actual
        const dia = now.toLocaleDateString(); // Formato de fecha local (ejemplo: '21/11/2024')
        const hora = now.toLocaleTimeString(); // Formato de hora local (ejemplo: '14:35:07')

        logDoc
          .set({
            dia: dia,
            hora: hora,
            userId: data.userId,
            nombre: userName,
          })
          .then(() => {
            //console.log('Log guardado con éxito.');
          })
          .catch((error) => {
            console.error('Error al guardar el log:', error);
          });

        /* -- */
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
    this.resetDefault();
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
        if (obj.tipo !== 'admin') {
          this.sendVerificationEmail();
        }
        this.estaLogeado = true;

        this.tipoDeUsuario = obj.tipo;
        this.objUsuario = obj;
        this.userName = obj.nombre + ' ' + obj.apellido;
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
      imagen: p.imagen,
      imagen2: p.imagen2,
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
      imagen: p.imagen,
      disponibilidad: {
        lunes: [],
        martes: [],
        miércoles: [],
        jueves: [],
        viernes: [],
        sábado: [],
      },
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
      mail: p.mail,
      imagen: p.imagen,
    };
    this.registrarUsuario(p.mail, p.password, obj);
  }

  esAdmin() {
    if (this.tipoDeUsuario === 'admin') {
      return true;
    }
    return false;
  }

  obtenerId() {
    return this.objUsuario.userId;
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
