import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarHistoriaClinicaFormComponent } from './cargar-historia-clinica-form.component';

describe('CargarHistoriaClinicaFormComponent', () => {
  let component: CargarHistoriaClinicaFormComponent;
  let fixture: ComponentFixture<CargarHistoriaClinicaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarHistoriaClinicaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarHistoriaClinicaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
