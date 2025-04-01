import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CommonComboBoxOutputDto, CommonLookupComboBoxService } from '@shared/services/common-lookup-comboBox.service';
import { MedicalConsultService } from '@shared/services/medical-consult.service';
import { MedicalConsultDto } from '@shared/models/medical-consult-model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocalDataService } from './../../../../shared/services/local-data.service';


@Component({
  selector: 'app-edit-medical-consult',
  templateUrl: './edit-medical-consult.component.html',
  styleUrl: './edit-medical-consult.component.css'
})
export class EditMedicalConsultComponent extends AppComponentBase implements OnInit {

  saving = false;
  consult: MedicalConsultDto = new MedicalConsultDto();
  id: number;
  consultFullData: MedicalConsultDto;

  @Output() onSave = new EventEmitter<any>();

  comboBoxes = new CommonComboBoxOutputDto();

  constructor(
    injector: Injector,
    public medicalConsultService: MedicalConsultService,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef,
    private commonLookupComboBoxService: CommonLookupComboBoxService,
    private localDataService: LocalDataService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.medicalConsultService.get(this.id).subscribe((result: MedicalConsultDto) => {
      this.consult = result;
      this.getCommonComboboxs();
      this.cd.detectChanges();
    });

    this.consultFullData = this.localDataService.getLastMedicalConsult();
    console.log(this.consultFullData);
  }

  getCommonComboboxs() {
    this.commonLookupComboBoxService.getComboBoxes().subscribe((resp: CommonComboBoxOutputDto) => {
      this.comboBoxes = resp;
      this.cd.detectChanges();
    });
  }

  save(): void {
    this.saving = true;

    this.medicalConsultService.update(this.consult).subscribe(
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
