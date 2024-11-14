import { Component, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AutentificadorService } from '../../../services/autentificador.service';
import { NotificacionService } from '../../../services/notificacion.service';
import { NgIf } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { NgxCaptchaModule } from 'ngx-captcha';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, LoadingComponent, NgxCaptchaModule],
  templateUrl: './paciente.component.html',
  styleUrl: '../style.css',
})
export class PacienteComponent {
  formulario: FormGroup;
  isLoading = false;
  siteKey = '6LffCX4qAAAAAOtQjENNNT_MRJY3jr1FOAMGl0_T';

  @Output() nuevoPaciente = new EventEmitter<Object>();

  constructor(
    private fb: FormBuilder,
    private auth: AutentificadorService,
    private notificar: NotificacionService,
    private ruteador: Router,
    public storage: StorageService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      dni: ['', Validators.required],
      obraSocial: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imagenPerfil1: [null, [Validators.required, this.fileValidator()]],
      imagenPerfil2: [null, [Validators.required, this.fileValidator()]],
      recaptcha: ['', Validators.required],
    });
  }

  fileValidator(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value;
      return file ? null : { requiredFile: true };
    };
  }

  async onSubmit() {
    if (this.formulario.valid) {
      this.isLoading = true;
      try {
        const archivoImagen1 = this.formulario.get('imagenPerfil1')
          ?.value as File;
        const archivoImagen2 = this.formulario.get('imagenPerfil2')
          ?.value as File;

        let urlImagen1 = '';
        if (archivoImagen1) {
          urlImagen1 = await this.storage.subir(
            archivoImagen1,
            `${this.formulario.get('nombre')?.value}.${
              this.formulario.get('dni')?.value
            }.1`
          );
        }

        // Subir la segunda imagen si existe
        let urlImagen2 = '';
        if (archivoImagen2) {
          urlImagen2 = await this.storage.subir(
            archivoImagen2,
            `${this.formulario.get('nombre')?.value}.${
              this.formulario.get('dni')?.value
            }.2`
          );
        }

        this.Registro({
          mail: this.formulario.get('mail')?.value,
          password: this.formulario.get('password')?.value,
          nombre: this.formulario.get('nombre')?.value,
          apellido: this.formulario.get('apellido')?.value,
          edad: this.formulario.get('edad')?.value,
          dni: this.formulario.get('dni')?.value,
          obraSocial: this.formulario.get('obraSocial')?.value,
          imagen: urlImagen1,
          imagen2: urlImagen2,
        });
      } catch (error) {
        console.error('Error al subir imágenes o registrar datos:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async Registro(objUsuario: any) {
    this.isLoading = true;
    try {
      await this.auth.registrarPaciente(objUsuario);
      this.notificar.exito('Registrado correctamente.');
      this.ruteador.navigate(['/home']);
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
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.formulario.patchValue({ imagenPerfil1: input.files[0] });
    }
  }

  onFileChange2(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.[0]) {
      this.formulario.patchValue({ imagenPerfil2: input.files[0] });
    }
  }

  handleSuccess($event: string) {
    console.log($event);
  }
}
