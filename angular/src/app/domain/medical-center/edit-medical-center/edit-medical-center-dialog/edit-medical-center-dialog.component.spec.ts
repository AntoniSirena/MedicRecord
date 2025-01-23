import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalCenterDialogComponent } from './edit-medical-center-dialog.component';

describe('EditMedicalCenterDialogComponent', () => {
  let component: EditMedicalCenterDialogComponent;
  let fixture: ComponentFixture<EditMedicalCenterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMedicalCenterDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMedicalCenterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
