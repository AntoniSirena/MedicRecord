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
  selector: 'app-edit-medical-center-dialog',
  templateUrl: './edit-medical-center-dialog.component.html',
  styleUrl: './edit-medical-center-dialog.component.css'
})
export class EditMedicalCenterDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  medicalCenter: MedicalCenterDto = new MedicalCenterDto();
  id: number;

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
      this.medicalCenterService.get(this.id).subscribe((result: MedicalCenterDto) => {
        this.medicalCenter = result;
        this.cd.detectChanges();
      });
    }
  
    save(): void {
      this.saving = true;
  
      this.medicalCenterService.update(this.medicalCenter).subscribe(
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
