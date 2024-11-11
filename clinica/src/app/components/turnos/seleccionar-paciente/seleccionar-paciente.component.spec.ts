import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarPacienteComponent } from './seleccionar-paciente.component';

describe('SeleccionarPacienteComponent', () => {
  let component: SeleccionarPacienteComponent;
  let fixture: ComponentFixture<SeleccionarPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
