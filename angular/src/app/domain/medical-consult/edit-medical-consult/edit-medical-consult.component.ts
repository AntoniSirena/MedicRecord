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

  @Output() onSave = new EventEmitter<any>();

  comboBoxes = new CommonComboBoxOutputDto();

  symptoms: any[] = [];
  diseases: any[] = [];
  dropdownSettings: any;
  selectedSymptoms = [];
  selectedDiseases = [];

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
    this.getCommonComboboxs();

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Seleccionas ',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      enableSearchFilter: true,
      classes: '',
      disabled: false
    };

    this.cd.detectChanges();
  }

  getCommonComboboxs() {
    this.commonLookupComboBoxService.getComboBoxes().subscribe((resp: CommonComboBoxOutputDto) => {
      this.comboBoxes = resp;

      this.comboBoxes.symptoms.map(x => {
        this.symptoms.push(
          { id: x.id, itemName: x.displayText }
        )
      });

      this.comboBoxes.diseases.map(x => {
        this.diseases.push(
          { id: x.id, itemName: x.displayText }
        )
      });

      this.getConsult();
    });
  }

  getConsult() {
    this.medicalConsultService.get(this.id).subscribe((result: MedicalConsultDto) => {
      this.consult = result;

      this.medicalConsultService.getData(this.consult.id).subscribe((resp: any) => {
        this.consult.patient = resp.result.patient;

        if (resp.result.symptoms.length) {
          resp.result.symptoms.map(x => {
            this.comboBoxes?.symptoms.map(y => {
              if (y.id == x) {
                this.selectedSymptoms.push(
                  { id: y.id, itemName: y.displayText }
                )
              }
            })
          });
        }

        if (resp.result.diseases.length) {
          resp.result.diseases.map(x => {
            this.comboBoxes?.diseases.map(y => {
              if (y.id == x) {
                this.selectedDiseases.push(
                  { id: y.id, itemName: y.displayText }
                )
              }
            })
          });
        }

        if(this.consult.isClosed){
          this.dropdownSettings = {
            disabled: true
          };
        }

        this.cd.detectChanges();
      });

    });
  }

  save(): void {
    this.saving = true;
    this.consult.diseases = [];
    this.consult.symptoms = [];

    if (this.selectedSymptoms.length) {
      this.selectedSymptoms.map(x => {
        {
          this.consult.symptoms.push(x.id);
        }
      });
    }

    if (this.selectedDiseases.length) {
      this.selectedDiseases.map(x => {
        {
          this.consult.diseases.push(x.id);
        }
      });
    }

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

  refreshSymptoms() {
    this.symptoms = [];
    this.comboBoxes.symptoms.forEach(x => {
      this.symptoms.push(
        { id: x.id, itemName: x.displayText }
      )
    });
  }

  refreshDiseases() {
    this.diseases = [];
    this.comboBoxes.diseases.forEach(x => {
      this.diseases.push(
        { id: x.id, itemName: x.displayText }
      )
    });
  }
}
