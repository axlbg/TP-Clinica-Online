import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideStorage(() => getStorage()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    {
      provide: FIREBASE_OPTIONS,
      useValue: {
        projectId: 'guzman-clinica',
        appId: '1:685287252029:web:59a836255a841f1b470a54',
        storageBucket: 'guzman-clinica.appspot.com',
        apiKey: 'AIzaSyDGjewiQfQP2z4DrUMmwqID6ULht27TZL8',
        authDomain: 'guzman-clinica.firebaseapp.com',
        messagingSenderId: '685287252029',
      },
    },
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'guzman-clinica',
        appId: '1:685287252029:web:59a836255a841f1b470a54',
        storageBucket: 'guzman-clinica.appspot.com',
        apiKey: 'AIzaSyDGjewiQfQP2z4DrUMmwqID6ULht27TZL8',
        authDomain: 'guzman-clinica.firebaseapp.com',
        messagingSenderId: '685287252029',
      })
    ),
  ],
};

/* "* Botones de Acceso rápido
 - Debe ser botones favbutton. Este debe tener una animación al mostrar las opciones de usuarios
 - Debe tener la imagen de perfil del usuario
 - Debe estar en la esquina inferior izquierda de la pantalla login. 6 usuarios. (3 pacientes, 2 especialistas, 1 admin)
-------------------------------
* Registro de usuarios
 - Al ingresar a la página solo se deben ver 2 botones con la imagen que represente un paciente o especialista, según esa elección mostrará el formulario correspondiente.
 - Estas imagenes tienen que estar en botones rectangulares uno al abajo del otro. Al hacer click el formulario debe aparecer con una aminación. */

/*
 "* Sacar un turno
 - Comienza mostrando las ESPECIALIDADES en botones con la imagen de la especialidad, en caso de no tener muesra imagen por default. Deben ser botones redondos sin el nombre de la especialidad
 - Una vez seleccionada mostrará los PROFESIONALES, en botones con la imagen de perfil de cada profesional y su nombre debajo. Estos botones deben ser redondos.
- Una vez seleccionado el profesional, aparecerán los días con turnos disponibles para ese PROFESIONAL. Estos botones deben ser rectangulares. Formato (09/09).
 - Seleccionado el día mostrará los horarios disponibles. Estos botones deben ser rectangulares. Formato 12:15am,.
 */

/*
 Sección Pacientes,	"Para los especialistas. Solo deberá mostrar los usuarios que el
especialista haya atendido al menos 1 vez."	Mostrar los usuarios con un favbutton redondo , imagen y nombre, 
al seleccionar un paciente  se muestra los dellaes de los turnos y un acceso a la reseña  de cada consulta

Sección usuarios	"Solamente para el perfil Administrador, un excel con los datos de los
usuarios."	Mostrar los usuarios con un favbutton redondo , imagen y nombre.Al seleccionarlo descarga los datos de que turnos tomo y con quien
Agustin friadenrich

Mi perfil	"Para los usuarios paciente, un pdf con la historia clínica. El PDF tiene que tener
logo de la clínica, título del informe y fecha de emisión."	Poder bajar Todas las atenciones que realice segun un PROFESIONAL
Animaciones	"Se debe agregar al menos 2, como mínimo, animaciones de transición entre componentes al navegar
la aplicación."	Una debe ser de desde arriba hacia abajo*/
