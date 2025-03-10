import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PatientDto } from '@shared/models/patient-model';
import { PatientService } from '@shared/services/patient.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { CommonComboBoxOutputDto, CommonLookupComboBoxService } from '@shared/services/common-lookup-comboBox.service';


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

  comboBoxes = new CommonComboBoxOutputDto();

  constructor(
    injector: Injector,
    public patientService: PatientService,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,
    private commonLookupComboBoxService: CommonLookupComboBoxService,
  ) {
    super(injector);
  }


  ngOnInit(): void {
    this.patientService.get(this.id).subscribe((result: PatientDto) => {
      this.patient = result;
      this.patient.birthDate = this.datePipe.transform(this.patient.birthDate, 'yyyy-MM-dd');
      this.getCommonComboboxs();
      this.cd.detectChanges();
    });
  }

  save(): void {
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
  
  getCommonComboboxs() {
    this.commonLookupComboBoxService.getComboBoxes().subscribe((resp: CommonComboBoxOutputDto) => {
      this.comboBoxes = resp;
      this.cd.detectChanges();
    });
  }

}
