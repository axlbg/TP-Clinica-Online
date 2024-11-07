import { Component, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AutentificadorService } from '../../services/autentificador.service';
import { NotificacionService } from '../../services/notificacion.service';
import { NgFor, NgIf } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, LoadingComponent, NgFor],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('slideIn', [
      // Creamos la animación 'slideIn'
      state('show', style({ transform: 'translateX(0)' })), // Definimos el estado 'show' con transformación translateX(0),
      state('hide', style({ transform: 'translateX(-100%)' })), // Definimos el estado 'hide' con transformación  translateX(-100%),
      transition('hide => show', [animate('0.5s ease-in')]), // Transición de 'hide' a 'show' con duración de 0.5 segundos
      transition('show => hide', [animate('0.5s ease-out')]), // Transición de 'show' a 'hide' con duración de 0.5  segundos
    ]),
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  isSlideIn = false;
  menuVisible = false;

  users = [
    {
      name: 'Pierre Nodoyuna',
      tipo: 'Paciente',
      mail: 'fofoce6356@operades.com',
      imagen:
        'https://firebasestorage.googleapis.com/v0/b/guzman-clinica.appspot.com/o/imagenesDePerfil%2FPierre.14315169.1.jpg?alt=media&token=83526574-40fa-4228-9d79-471032cfa2c9',
    },
    {
      name: 'Pedro Picapiedra',
      tipo: 'Paciente',
      mail: 'todada3981@operades.com',
      imagen:
        'https://firebasestorage.googleapis.com/v0/b/guzman-clinica.appspot.com/o/imagenesDePerfil%2FPedro.1000001.1.jpg?alt=media&token=d6f638e5-e4da-4a5b-8de6-4b8f4f1054b1',
    },
    {
      name: 'Vilma Palma',
      tipo: 'Paciente',
      mail: 'facof48168@inikale.com',
      imagen:
        'https://firebasestorage.googleapis.com/v0/b/guzman-clinica.appspot.com/o/imagenesDePerfil%2FVilma.35014588.1.jpg?alt=media&token=b2b645f5-c7c2-4364-9d41-24424363ca79',
    },
    {
      name: 'Carlos Bilardo',
      tipo: 'Especialista',
      mail: 'yasab81068@lineacr.com',
      imagen:
        'https://firebasestorage.googleapis.com/v0/b/guzman-clinica.appspot.com/o/imagenesDePerfil%2FCarlos.13156985.1.jpg?alt=media&token=0718bfd7-5a70-40d2-8e90-136c04028b22',
    },
    {
      name: 'Johnny Bravo',
      tipo: 'Especialista',
      mail: 'moxorax207@lineacr.com',
      imagen:
        'https://firebasestorage.googleapis.com/v0/b/guzman-clinica.appspot.com/o/imagenesDePerfil%2FJohnny.45669837.1.jpg?alt=media&token=10b9f4b8-c3e2-4440-b7f1-f418dcec9caf',
    },
    {
      name: 'Javier Milei',
      tipo: 'Admin',
      mail: 'niyore5474@operades.com',
      imagen:
        'https://firebasestorage.googleapis.com/v0/b/guzman-clinica.appspot.com/o/imagenesDePerfil%2FJavier.21834641.1.jpg?alt=media&token=7e4af44e-4d81-44e0-af8d-950c2e2b3e8f',
    },
  ];

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    this.isSlideIn = !this.isSlideIn;
  }

  onUserClick(user: any) {
    console.log('Usuario seleccionado:', user.name);

    this.loginForm.controls['mail'].setValue(user.mail);
    this.loginForm.controls['password'].setValue('ejemplo123');
    //
  }

  constructor(
    private fb: FormBuilder,
    private ruteador: Router,
    private autentificador: AutentificadorService,
    private notificar: NotificacionService
  ) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      //
      this.login();
    }
  }

  async login() {
    if (this.autentificador.estaLogeado) {
      console.log('ya esta logeado');
    } else {
      const email = this.loginForm.get('mail')?.value;
      const password = this.loginForm.get('password')?.value;

      this.isLoading = true;

      try {
        const inicio = await this.autentificador.logear(email, password);
        if (inicio) {
          if (
            this.autentificador.tipoDeUsuario == 'especialista' &&
            !this.autentificador.accesoEspecialista
          ) {
            this.ruteador.navigate(['/perfil']);
            this.notificar.error(
              'Especialista logeado. Necesita aprobar su cuenta.'
            );
          } else {
            this.ruteador.navigate(['/perfil']);
            this.notificar.exito('Logeado correctamente.');
          }
        } else {
          this.notificar.error('Error al logear. Intenta de nuevo');
        }
      } catch (error) {
        this.notificar.error('Error en el inicio de sesión');
      } finally {
        this.isLoading = false;
      }
    }
  }
}
