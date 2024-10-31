import { CanActivateFn } from '@angular/router';
import { AutentificadorService } from '../services/autentificador.service';
import { inject } from '@angular/core';

export const logeadoGuard: CanActivateFn = (route, state) => {
  return !inject(AutentificadorService).estaLogeado;
};
