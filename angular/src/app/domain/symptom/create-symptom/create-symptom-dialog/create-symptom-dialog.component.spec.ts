import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSymptomDialogComponent } from './create-symptom-dialog.component';

describe('CreateSymptomDialogComponent', () => {
  let component: CreateSymptomDialogComponent;
  let fixture: ComponentFixture<CreateSymptomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSymptomDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSymptomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
