import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistasTablaComponent } from './especialistas-tabla.component';

describe('EspecialistasTablaComponent', () => {
  let component: EspecialistasTablaComponent;
  let fixture: ComponentFixture<EspecialistasTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EspecialistasTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecialistasTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
