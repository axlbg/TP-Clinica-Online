import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesTablaComponent } from './pacientes-tabla.component';

describe('PacientesTablaComponent', () => {
  let component: PacientesTablaComponent;
  let fixture: ComponentFixture<PacientesTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacientesTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PacientesTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
