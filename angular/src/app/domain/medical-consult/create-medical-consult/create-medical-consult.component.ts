import { ChangeDetectorRef, Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MedicalConsultDto } from '@shared/models/medical-consult-model';
import { MedicalConsultService } from './../../../../shared/services/medical-consult.service';
import { CommonComboBoxOutputDto, CommonLookupComboBoxService } from './../../../../shared/services/common-lookup-comboBox.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-medical-consult',
  templateUrl: './create-medical-consult.component.html',
  styleUrl: './create-medical-consult.component.css'
})
export class CreateMedicalConsultComponent extends AppComponentBase implements OnInit {
  saving = false;
  consult: MedicalConsultDto = new MedicalConsultDto();

  @Output() onSave = new EventEmitter<any>();

  comboBoxes = new CommonComboBoxOutputDto();

  constructor(
    injector: Injector,
    public medicalConsultService: MedicalConsultService,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef,
    private commonLookupComboBoxService: CommonLookupComboBoxService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.consult.isActive = true;
    this.getCommonComboboxs();
    this.cd.detectChanges();
  }

  save(): void {
    this.saving = true;
    this.medicalConsultService.create(this.consult).subscribe(
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
