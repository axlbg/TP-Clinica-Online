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
import { NgIf } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

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

  accesoRapido(x: number) {
    switch (x) {
      case 1: // especialista
        this.loginForm.controls['mail'].setValue('betito@example.com');
        this.loginForm.controls['password'].setValue('ejemplo123');
        break;
      case 2: // admin
        this.loginForm.controls['mail'].setValue('asd@mail.com');
        this.loginForm.controls['password'].setValue('123123');
        break;
      default: // paciente
        this.loginForm.controls['mail'].setValue('atomic@ant.com');
        this.loginForm.controls['password'].setValue('ejemplo123');
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
            this.ruteador.navigate(['/home']);
            this.notificar.error(
              'Especialista logeado. Necesita aprobar su cuenta.'
            );
          } else {
            this.ruteador.navigate(['/home']);
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
