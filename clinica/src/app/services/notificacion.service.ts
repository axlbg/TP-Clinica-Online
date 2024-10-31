import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  constructor() {}

  async error(msj: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'red',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: 'error',
      title: msj,
    });
  }

  async exito(msj: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'green',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
    await Toast.fire({
      icon: 'success',
      title: msj,
    });
  }
}
