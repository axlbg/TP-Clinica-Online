import { CommonModule } from '@angular/common';
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
import { StorageService } from '../../../services/storage.service';
import { LoadingComponent } from '../../loading/loading.component';
import { Router } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';

@Component({
  selector: 'app-especialista-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    LoadingComponent,
    NgxCaptchaModule,
  ],
  templateUrl: './especialista-form.component.html',
  styleUrl: '../style.css',
})
export class EspecialistaFormComponent {
  formulario: FormGroup;
  especialidades = ['Cardiólogo', 'Neurólogo', 'Hematólogo', 'Odontólogo'];
  imagen: any;
  isLoading = false;
  siteKey = '6LffCX4qAAAAAOtQjENNNT_MRJY3jr1FOAMGl0_T';

  constructor(
    private fb: FormBuilder,
    private registro: AutentificadorService,
    private notificar: NotificacionService,
    private ruteador: Router,
    private storage: StorageService
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      dni: ['', Validators.required],
      especialidad: ['', Validators.required],
      otraEspecialidad: [''],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imagenPerfil: [null, [Validators.required, this.fileValidator()]],
      recaptcha: ['', Validators.required],
    });
  }

  handleSuccess($event: string) {
    console.log($event);
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
        const archivoImagen1 = this.formulario.get('imagenPerfil')
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

        const datosFormulario = { ...this.formulario.value };
        if (datosFormulario.especialidad === 'Otra') {
          datosFormulario.especialidad = datosFormulario.otraEspecialidad;
        }
        this.Registro({
          mail: this.formulario.get('mail')?.value,
          password: this.formulario.get('password')?.value,
          nombre: this.formulario.get('nombre')?.value,
          apellido: this.formulario.get('apellido')?.value,
          edad: this.formulario.get('edad')?.value,
          dni: this.formulario.get('dni')?.value,
          especialidad: [datosFormulario.especialidad],

          imagen: urlImagen1,
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
      await this.registro.registrarEspecialista(objUsuario);
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
      this.formulario.patchValue({ imagenPerfil: input.files[0] });
    }
  }
}
