import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AutentificadorService } from '../../../services/autentificador.service';
import { NotificacionService } from '../../../services/notificacion.service';
import { NgIf } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, LoadingComponent],
  templateUrl: './paciente.component.html',
  styleUrl: '../style.css',
})
export class PacienteComponent {
  formulario: FormGroup;
  isLoading = false;

  @Output() nuevoPaciente = new EventEmitter<Object>();

  constructor(
    private fb: FormBuilder,
    private registro: AutentificadorService,
    private notificar: NotificacionService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      dni: ['', Validators.required],
      obraSocial: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imagenPerfil1: [null],
      imagenPerfil2: [null],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      //  console.log(this.formulario.value);
      this.Registro({
        mail: this.formulario.get('mail')?.value,
        password: this.formulario.get('password')?.value,
        nombre: this.formulario.get('nombre')?.value,
        apellido: this.formulario.get('apellido')?.value,
        edad: this.formulario.get('edad')?.value,
        dni: this.formulario.get('dni')?.value,
        obraSocial: this.formulario.get('obraSocial')?.value,
      });
    }
  }

  async Registro(objUsuario: any) {
    this.isLoading = true;
    try {
      await this.registro.registrarPaciente(objUsuario);
      this.notificar.exito('Registrado correctamente.');
    } catch (error: any) {
      this.notificar.error(this.createMessage(error.code));
    } finally {
      this.isLoading = false;
    }
  }
  private createMessage(errorCode: string): string {
    let message: string = '';
    switch (errorCode) {
      case 'auth/internal-error':
        message = 'Los campos estan vacios';
        break;
      case 'auth/operation-not-allowed':
        message = 'La operación no está permitida.';
        break;
      case 'auth/email-already-in-use':
        message = 'El email ya está registrado.';
        break;
      case 'auth/invalid-email':
        message = 'El email no es valido.';
        break;
      case 'auth/weak-password':
        message = 'La contraseña debe tener al menos 6 caracteres';
        break;
      default:
        message = 'Error al crear el usuario.';
        break;
    }

    return message;
  }
}
