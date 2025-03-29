import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicalConsultComponent } from './create-medical-consult.component';

describe('CreateMedicalConsultComponent', () => {
  let component: CreateMedicalConsultComponent;
  let fixture: ComponentFixture<CreateMedicalConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMedicalConsultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMedicalConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
