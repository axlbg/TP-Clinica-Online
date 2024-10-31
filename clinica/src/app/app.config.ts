import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
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
  ],
};
