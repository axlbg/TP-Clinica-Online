import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-form.component.html',
  styleUrl: '../style.css',
})
export class AdminFormComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(120)]],
      dni: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imagenPerfil: [null],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
    }
  }
}
