import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PatientDto } from '@shared/models/patient-model';
import { PatientService } from '@shared/services/patient.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-edit-patient-dialog',
  templateUrl: './edit-patient-dialog.component.html',
  styleUrl: './edit-patient-dialog.component.css'
})
export class EditPatientDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  patient: PatientDto = new PatientDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public patientService: PatientService,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.patientService.get(this.id).subscribe((result: PatientDto) => {
      this.patient = result;
      this.patient.birthDate = this.datePipe.transform(this.patient.birthDate, 'yyyy-MM-dd');
      this.cd.detectChanges();
    });
  }

  save(): void {
    this.patient.medicalCenterId = 1;
    this.patient.bloodTypeId = 3;
    this.saving = true;

    this.patientService.update(this.patient).subscribe(
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
