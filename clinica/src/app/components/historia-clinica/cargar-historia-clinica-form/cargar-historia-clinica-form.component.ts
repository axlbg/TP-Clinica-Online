import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-cargar-historia-clinica-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './cargar-historia-clinica-form.component.html',
  styleUrl: './cargar-historia-clinica-form.component.css',
})
export class CargarHistoriaClinicaFormComponent {
  datosForm: FormGroup;

  @Output() enviar: EventEmitter<{ comentario: string; historiaClinica: any }> =
    new EventEmitter();
  @Output() salir: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.datosForm = this.fb.group({
      comentario: ['', Validators.required],
      altura: ['', Validators.required],
      peso: ['', Validators.required],
      temperatura: ['', Validators.required],
      presion: ['', Validators.required],
      datosDinamicos: this.fb.array([]),
    });
  }

  get datosDinamicos(): FormArray {
    return this.datosForm.get('datosDinamicos') as FormArray;
  }

  agregarDatoDinamico() {
    if (this.datosDinamicos.length < 3) {
      const datoDinamico = this.fb.group({
        clave: ['', Validators.required],
        valor: ['', Validators.required],
      });
      this.datosDinamicos.push(datoDinamico);
    }
  }

  eliminarDatoDinamico(index: number) {
    this.datosDinamicos.removeAt(index);
  }

  onSubmit() {
    if (this.datosForm.valid) {
      const formData = this.datosForm.value;

      const comentario = formData.comentario;

      const historiaClinica = {
        altura: formData.altura,
        peso: formData.peso,
        temperatura: formData.temperatura,
        presion: formData.presion,
      };

      formData.datosDinamicos.forEach((dato: { clave: string; valor: any }) => {
        if (dato.clave && dato.valor) {
          (historiaClinica as any)[dato.clave] = dato.valor;
        }
      });

      const datos = {
        comentario: comentario,
        historiaClinica: historiaClinica,
      };

      this.enviar.emit(datos);
    }
  }

  salirSinCompletar() {
    this.salir.emit();
  }
}
