import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PatientDto } from '@shared/models/patient-model';
import { PatientService } from '@shared/services/patient.service';
import { CommonComboBoxOutputDto, CommonLookupComboBoxService } from '@shared/services/common-lookup-comboBox.service';
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-create-patient-dialog',
  templateUrl: './create-patient-dialog.component.html',
  styleUrl: './create-patient-dialog.component.css'
})
export class CreatePatientDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  patient: PatientDto = new PatientDto();

  @Output() onSave = new EventEmitter<any>();

  comboBoxes = new CommonComboBoxOutputDto();

  constructor(
    injector: Injector,
    public patientService: PatientService,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef,
    private commonLookupComboBoxService: CommonLookupComboBoxService,
  ) {
    super(injector);
  }

  async ngOnInit(): Promise<void> {
    this.patient.isActive = true;
    this.getCommonComboboxs();
    this.cd.detectChanges();
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

  getCommonComboboxs() {
    this.commonLookupComboBoxService.getComboBoxes().subscribe((resp: CommonComboBoxOutputDto) => {
      this.comboBoxes = resp;
      this.cd.detectChanges();
    });
  }
}
