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
import { MedicalCenterDto } from '@shared/models/medical-center-model';
import { MedicalCenterService } from '@shared/services/medical-center.service';

@Component({
  selector: 'app-create-medical-center-dialog',
  templateUrl: './create-medical-center-dialog.component.html',
  styleUrl: './create-medical-center-dialog.component.css'
})
export class CreateMedicalCenterDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  medicalCenter: MedicalCenterDto = new MedicalCenterDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public medicalCenterService: MedicalCenterService,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.cd.detectChanges();
  }

  save(): void {
    this.saving = true;

    this.medicalCenterService.create(this.medicalCenter).subscribe(
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
