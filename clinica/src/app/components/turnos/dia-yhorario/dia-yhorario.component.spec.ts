import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaYHorarioComponent } from './dia-yhorario.component';

describe('DiaYHorarioComponent', () => {
  let component: DiaYHorarioComponent;
  let fixture: ComponentFixture<DiaYHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiaYHorarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaYHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
