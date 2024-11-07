import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarFormComponent } from './solicitar-form.component';

describe('SolicitarFormComponent', () => {
  let component: SolicitarFormComponent;
  let fixture: ComponentFixture<SolicitarFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
