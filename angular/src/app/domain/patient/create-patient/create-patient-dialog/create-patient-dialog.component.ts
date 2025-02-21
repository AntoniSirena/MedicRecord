import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PatientDto } from '@shared/models/patient-model';
import { PatientService } from '@shared/services/patient.service';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-create-patient-dialog',
  templateUrl: './create-patient-dialog.component.html',
  styleUrl: './create-patient-dialog.component.css'
})
export class CreatePatientDialogComponent extends AppComponentBase implements OnInit{

    saving = false;
    patient: PatientDto = new PatientDto();
  
    @Output() onSave = new EventEmitter<any>();
  
    constructor(
      injector: Injector,
      public patientService: PatientService,
      public bsModalRef: BsModalRef,
      private cd: ChangeDetectorRef
    ) {
      super(injector);
    }

    ngOnInit(): void {
      this.patient.isActive = true;
      this.cd.detectChanges();
    }
  
    save(): void {
      this.patient.medicalCenterId = 1;
      this.patient.bloodTypeId = 3;
      this.saving = true;

      this.patientService.create(this.patient).subscribe(
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
