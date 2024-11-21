import { Routes } from '@angular/router';
import { adminguardGuard } from './guards/adminguard.guard';
import { logeadoGuard } from './guards/logeado.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'bienvenida',
    loadComponent: () =>
      import('./pages/bienvenida/bienvenida.component').then(
        (c) => c.BienvenidaComponent
      ),
    data: { animation: 'Bienvenida' },
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/bienvenida/bienvenida.component').then(
        (c) => c.BienvenidaComponent
      ),
    data: { animation: 'Home' },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
    canActivate: [logeadoGuard],
    data: { animation: 'Login' },
  },
  {
    path: 'registro',
    loadComponent: () =>
      import('./pages/registro/registro.component').then(
        (c) => c.RegistroComponent
      ),
    canActivate: [logeadoGuard],
    data: { animation: 'Registro' },
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./pages/usuarios/usuarios.component').then(
        (c) => c.UsuariosComponent
      ),
    canActivate: [adminguardGuard],
    data: { animation: 'Usuarios' },
  },
  {
    path: 'misturnos',
    loadComponent: () =>
      import('./pages/mis-turnos/mis-turnos.component').then(
        (c) => c.MisTurnosComponent
      ),
    data: { animation: 'MisTurnos' },
  },
  {
    path: 'turnos',
    loadComponent: () =>
      import('./pages/turnos/turnos.component').then((c) => c.TurnosComponent),
    canActivate: [adminguardGuard],
    data: { animation: 'Turnos' },
  },
  {
    path: 'solicitarturno',
    loadComponent: () =>
      import('./pages/solicitar-turno/solicitar-turno.component').then(
        (c) => c.SolicitarTurnoComponent
      ),
    data: { animation: 'SolicitarTurno' },
  },
  {
    path: 'perfil',
    loadComponent: () =>
      import('./pages/mi-perfil/mi-perfil.component').then(
        (c) => c.MiPerfilComponent
      ),
    data: { animation: 'Perfil' },
  },
  {
    path: 'pacientes',
    loadComponent: () =>
      import('./pages/pacientes/pacientes.component').then(
        (c) => c.PacientesComponent
      ),
    data: { animation: 'Pacientes' },
  },
  {
    path: 'estadisticas',
    loadComponent: () =>
      import('./pages/estadisticas/estadisticas.component').then(
        (c) => c.EstadisticasComponent
      ),
    data: { animation: 'Estadisticas' },
  },
];
