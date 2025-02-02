import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTurnosEspecialistaComponent } from './listado-turnos-especialista.component';

describe('ListadoTurnosEspecialistaComponent', () => {
  let component: ListadoTurnosEspecialistaComponent;
  let fixture: ComponentFixture<ListadoTurnosEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTurnosEspecialistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTurnosEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
