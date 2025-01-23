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
import { DiseaseService } from '@shared/services/disease.service';

@Component({
  selector: 'app-edit-disease-dialog',
  templateUrl: './edit-disease-dialog.component.html',
  styleUrl: './edit-disease-dialog.component.css'
})
export class EditDiseaseDialogComponent extends AppComponentBase implements OnInit {

  saving = false;
  disease: DiseaseDto = new DiseaseDto();
  id: number;

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
    this.diseaseService.get(this.id).subscribe((result: DiseaseDto) => {
      this.disease = result;
      this.cd.detectChanges();
    });
  }

  save(): void {
    this.saving = true;

    this.diseaseService.update(this.disease).subscribe(
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
