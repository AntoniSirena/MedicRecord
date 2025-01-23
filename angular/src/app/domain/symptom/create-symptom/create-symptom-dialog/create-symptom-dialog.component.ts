import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { SymptomDto } from '@shared/models/symptom-model';
import { SymptomService } from './../../../../../shared/services/symptom.service';

@Component({
  selector: 'app-create-symptom-dialog',
  templateUrl: './create-symptom-dialog.component.html',
  styleUrl: './create-symptom-dialog.component.css'
})
export class CreateSymptomDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  symptom: SymptomDto = new SymptomDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public symptomService: SymptomService,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.symptom.isActive = true;
    this.cd.detectChanges();
  }

  save(): void {
    this.saving = true;

    this.symptomService.create(this.symptom).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }

}
