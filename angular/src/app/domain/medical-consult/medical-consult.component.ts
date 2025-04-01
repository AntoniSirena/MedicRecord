import { ChangeDetectorRef, Component, Injector, ViewChild } from '@angular/core';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { MedicalConsultDto, MedicalConsultPagedResultDto } from "@shared/models/medical-consult-model";
import { Table } from '@node_modules/primeng/table';
import { Paginator } from '@node_modules/primeng/paginator';
import { MedicalConsultService } from '@shared/services/medical-consult.service';
import { finalize } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ActivatedRoute } from '@node_modules/@angular/router';
import { LazyLoadEvent } from '@node_modules/primeng/api';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateMedicalConsultComponent } from './create-medical-consult/create-medical-consult.component';
import { EditMedicalConsultComponent } from './edit-medical-consult/edit-medical-consult.component';
import { LocalDataService } from './../../../shared/services/local-data.service';

@Component({
  selector: 'app-medical-consult',
  templateUrl: './medical-consult.component.html',
  styleUrl: './medical-consult.component.css',
  animations: [appModuleAnimation()],
})
export class MedicalConsultComponent extends PagedListingComponentBase<MedicalConsultDto> {

  medicalConsults: MedicalConsultDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;
  @ViewChild("dataTable", { static: true }) dataTable: Table;
  @ViewChild("paginator", { static: true }) paginator: Paginator;

  constructor(
    injector: Injector,
    private medicalConsultService: MedicalConsultService,
    private _modalService: BsModalService,
    private _activatedRoute: ActivatedRoute,
    private localDataService: LocalDataService,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
    this.keyword = this._activatedRoute.snapshot.queryParams["keyword"] || "";
  }

  ngOnInit(): void {
    this.cd.detectChanges();
  }


  list(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      if (
        this.primengTableHelper.records &&
        this.primengTableHelper.records.length > 0
      ) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this.medicalConsultService
      .getAll(
        this.keyword,
        this.isActive,
        this.primengTableHelper.getSorting(this.dataTable),
        this.primengTableHelper.getSkipCount(this.paginator, event),
        this.primengTableHelper.getMaxResultCount(this.paginator, event)
      )
      .pipe(
        finalize(() => {
          this.primengTableHelper.hideLoadingIndicator();
        })
      )
      .subscribe((result: MedicalConsultPagedResultDto) => {
        console.log(result);
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.hideLoadingIndicator();
        this.cd.detectChanges();
      });
  }

  delete(input: MedicalConsultDto): void {
    abp.message.confirm(
      this.l("AreYouSureWantToDelete", input.id),
      undefined,
      (result: boolean) => {
        if (result) {
          this.medicalConsultService
            .delete(input.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l("SuccessfullyDeleted"));
                this.refresh();
              })
            )
            .subscribe(() => { });
        }
      }
    );
  }

  create(): void {
    this.showCreateOrEditDialog();
  }

  edit(input: MedicalConsultDto): void {
    this.localDataService.setLastMedicalConsult(input);
    
    this.showCreateOrEditDialog(input.id);
  }

  showCreateOrEditDialog(id?: number): void {
    let createOrEditDialog: BsModalRef;
    if (!id) {
      createOrEditDialog = this._modalService.show(
        CreateMedicalConsultComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        EditMedicalConsultComponent,
        {
          class: "modal-xl",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  getPatientHistory(id: number){
   
  }
}
