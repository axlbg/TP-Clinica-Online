import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition(
    'MisTurnos <=> Pacientes, Perfil <=> Pacientes, MisTurnos <=> Perfil, MisTurnos <=> SolicitarTurno, Pacientes <=> SolicitarTurno, Perfil <=> SolicitarTurno,Turnos <=> SolicitarTurno,Usuarios<=>Turnos, MisTurnos <=> Turnos, Pacientes <=> Turnos, Perfil <=> Turnos, MisTurnos <=> Usuarios, Pacientes <=> Usuarios, Perfil <=> Usuarios, Estadisticas <=> SolicitarTurno, Estadisticas <=> Turnos, Perfil <=> Estadisticas, Usuarios <=>SolicitarTurno, Estadisticas<=> Usuarios',
    [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '-100%' })], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [animate('300ms ease-out', style({ left: '100%' }))], {
          optional: true,
        }),
        query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], {
          optional: true,
        }),
      ]),
    ]
  ),
  transition('Home <=> Login, Home <=> Registro, Login <=> Registro', [
    // Configurar el contenedor general
    query(
      ':enter',
      [
        style({
          position: 'absolute',
          top: '-100%', // Inicia fuera de la pantalla, arriba
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({
          position: 'absolute',
          top: '+100%',
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [animate('300ms ease-in', style({ top: '0%' }))], {
      optional: true,
    }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('300ms ease-out', style({ top: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('300ms ease-out', style({ top: '0%' }))], {
        optional: true,
      }),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
]);

export const slideTopAnimation = trigger('routeAnimations', [
  transition('Home <=> Login, Home <=> Registro, Login <=> Registro', [
    // Configurar el contenedor general
    query(
      ':enter',
      [
        style({
          position: 'absolute',
          top: '-100%', // Inicia fuera de la pantalla, arriba
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(
      ':leave',
      [
        style({
          position: 'absolute',
          top: '+100%',
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [animate('300ms ease-in', style({ top: '0%' }))], {
      optional: true,
    }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('300ms ease-out', style({ top: '100%' }))], {
        optional: true,
      }),
      query(':enter', [animate('300ms ease-out', style({ top: '0%' }))], {
        optional: true,
      }),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
]);
