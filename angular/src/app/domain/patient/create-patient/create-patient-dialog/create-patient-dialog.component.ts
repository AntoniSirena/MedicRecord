import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PatientDto } from '@shared/models/patient-model';
import { PatientService } from '@shared/services/patient.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ListDropdownDto } from './../../../../../shared/models/shared-model';


@Component({
  selector: 'app-create-patient-dialog',
  templateUrl: './create-patient-dialog.component.html',
  styleUrl: './create-patient-dialog.component.css'
})
export class CreatePatientDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  patient: PatientDto = new PatientDto();

  @Output() onSave = new EventEmitter<any>();

  bloodTypes: ListDropdownDto[] = [];
  medicalCenters: ListDropdownDto[] = [];

  constructor(
    injector: Injector,
    public patientService: PatientService,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.patient.isActive = true;
    this.cd.detectChanges();
    this.getBloodTypes();
    this.getMedicalCenters();
  }

  save(): void {
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

  getBloodTypes() {
    this.patientService.getBloodTypes().subscribe(
      (resp: any) => {
        this.bloodTypes = resp.result;
      },
      () => {

      }
    );
  }

  getMedicalCenters() {
    this.patientService.getMedicalCenters().subscribe(
      (resp: any) => {
        this.medicalCenters = resp.result;
      },
      () => {

      }
    );
  }

}
