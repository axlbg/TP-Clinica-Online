import { Routes } from '@angular/router';
import { adminguardGuard } from './guards/adminguard.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/bienvenida/bienvenida.component').then(
        (c) => c.BienvenidaComponent
      ),
  },
  {
    path: 'bienvenida',
    loadComponent: () =>
      import('./pages/bienvenida/bienvenida.component').then(
        (c) => c.BienvenidaComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/bienvenida/bienvenida.component').then(
        (c) => c.BienvenidaComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (c) => c.RegistroComponent
      ),
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./pages/usuarios/usuarios.component').then(
        (c) => c.UsuariosComponent
      ),
    canActivate: [adminguardGuard],
  },
];
