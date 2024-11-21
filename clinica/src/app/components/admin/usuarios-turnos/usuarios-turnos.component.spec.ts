import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosTurnosComponent } from './usuarios-turnos.component';

describe('UsuariosTurnosComponent', () => {
  let component: UsuariosTurnosComponent;
  let fixture: ComponentFixture<UsuariosTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosTurnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
