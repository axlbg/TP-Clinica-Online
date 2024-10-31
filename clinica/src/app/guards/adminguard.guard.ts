import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AutentificadorService } from '../services/autentificador.service';

export const adminguardGuard: CanActivateFn = (route, state) => {
  return inject(AutentificadorService).esAdmin();
};
