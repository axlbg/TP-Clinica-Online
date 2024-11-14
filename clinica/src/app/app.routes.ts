import { Routes } from '@angular/router';
import { adminguardGuard } from './guards/adminguard.guard';
import { logeadoGuard } from './guards/logeado.guard';

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
    canActivate: [logeadoGuard],
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (c) => c.RegistroComponent
      ),
    canActivate: [logeadoGuard],
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./pages/usuarios/usuarios.component').then(
        (c) => c.UsuariosComponent
      ),
    canActivate: [adminguardGuard],
  },
  {
    path: 'misturnos',
    loadComponent: () =>
      import('./pages/mis-turnos/mis-turnos.component').then(
        (c) => c.MisTurnosComponent
      ),
  },
  {
    path: 'turnos',
    loadComponent: () =>
      import('./pages/turnos/turnos.component').then((c) => c.TurnosComponent),
    canActivate: [adminguardGuard],
  },
  {
    path: 'solicitarturno',
    loadComponent: () =>
      import('./pages/solicitar-turno/solicitar-turno.component').then(
        (c) => c.SolicitarTurnoComponent
      ),
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./pages/mi-perfil/mi-perfil.component').then(
        (c) => c.MiPerfilComponent
      ),
  },
  {
    path: 'test',
    loadComponent: () =>
      import(
        './components/historia-clinica/cargar-historia-clinica-form/cargar-historia-clinica-form.component'
      ).then((c) => c.CargarHistoriaClinicaFormComponent),
  },
];
