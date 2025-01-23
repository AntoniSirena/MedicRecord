import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDiseaseDialogComponent } from './edit-disease-dialog.component';

describe('EditDiseaseDialogComponent', () => {
  let component: EditDiseaseDialogComponent;
  let fixture: ComponentFixture<EditDiseaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDiseaseDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDiseaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
