import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTurnosPacienteComponent } from './listado-turnos-paciente.component';

describe('ListadoTurnosPacienteComponent', () => {
  let component: ListadoTurnosPacienteComponent;
  let fixture: ComponentFixture<ListadoTurnosPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTurnosPacienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTurnosPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
