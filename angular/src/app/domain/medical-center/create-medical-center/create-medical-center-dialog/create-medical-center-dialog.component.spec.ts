import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicalCenterDialogComponent } from './create-medical-center-dialog.component';

describe('CreateMedicalCenterDialogComponent', () => {
  let component: CreateMedicalCenterDialogComponent;
  let fixture: ComponentFixture<CreateMedicalCenterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMedicalCenterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateMedicalCenterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
