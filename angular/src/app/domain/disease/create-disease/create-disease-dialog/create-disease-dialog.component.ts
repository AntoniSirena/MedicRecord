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
import { DiseaseDto } from '@shared/models/disease-model';
import { DiseaseService } from './../../../../../shared/services/disease.service';

@Component({
  selector: 'app-create-disease-dialog',
  templateUrl: './create-disease-dialog.component.html',
  styleUrl: './create-disease-dialog.component.css'
})
export class CreateDiseaseDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  disease: DiseaseDto = new DiseaseDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public diseaseService: DiseaseService,
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.disease.isActive = true;
    this.cd.detectChanges();
  }

  save(): void {
    this.saving = true;

    this.diseaseService.create(this.disease).subscribe(
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
