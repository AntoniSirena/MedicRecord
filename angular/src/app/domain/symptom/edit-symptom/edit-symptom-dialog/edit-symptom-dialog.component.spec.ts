import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSymptomDialogComponent } from './edit-symptom-dialog.component';

describe('EditSymptomDialogComponent', () => {
  let component: EditSymptomDialogComponent;
  let fixture: ComponentFixture<EditSymptomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSymptomDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSymptomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
