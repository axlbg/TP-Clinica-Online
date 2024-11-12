import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoTurnosAdminComponent } from './listado-turnos-admin.component';

describe('ListadoTurnosAdminComponent', () => {
  let component: ListadoTurnosAdminComponent;
  let fixture: ComponentFixture<ListadoTurnosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoTurnosAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoTurnosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
