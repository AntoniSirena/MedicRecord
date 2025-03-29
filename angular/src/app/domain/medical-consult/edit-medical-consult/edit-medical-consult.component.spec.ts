import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalConsultComponent } from './edit-medical-consult.component';

describe('EditMedicalConsultComponent', () => {
  let component: EditMedicalConsultComponent;
  let fixture: ComponentFixture<EditMedicalConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMedicalConsultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMedicalConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
