import {
  ChangeDetectorRef,
  Component,
  Injector,
  ViewChild,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ActivatedRoute } from "@node_modules/@angular/router";
import { LazyLoadEvent } from "@node_modules/primeng/api";
import { Paginator } from "@node_modules/primeng/paginator";
import { Table } from "@node_modules/primeng/table";
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase } from "@shared/paged-listing-component-base";
import { PatientDto, PatientPagedResultDto } from '@shared/models/patient-model';
import { PatientService } from "@shared/services/patient.service";
import { CreatePatientDialogComponent } from "./create-patient/create-patient-dialog/create-patient-dialog.component";
import { EditPatientDialogComponent } from "./edit-patient/edit-patient-dialog/edit-patient-dialog.component";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
  animations: [appModuleAnimation()],
})
export class PatientComponent extends PagedListingComponentBase<PatientDto> {

  patients: PatientDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;
  @ViewChild("dataTable", { static: true }) dataTable: Table;
  @ViewChild("paginator", { static: true }) paginator: Paginator;

  constructor(
    injector: Injector,
    private patientService: PatientService,
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    cd: ChangeDetectorRef
  ) {
    super(injector, cd);
    this.keyword = this.activatedRoute.snapshot.queryParams["keyword"] || "";
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

    this.patientService
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
      .subscribe((result: PatientPagedResultDto) => {
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.hideLoadingIndicator();
        this.cd.detectChanges();
      });
  }

  delete(input: PatientDto): void {
    abp.message.confirm(
      this.l("AreYouSureWantToDelete", input.firstName + ' ' + input.firstSurname),
      undefined,
      (result: boolean) => {
        if (result) {
          this.patientService
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

  edit(input: PatientDto): void {
    this.showCreateOrEditDialog(input.id);
  }

  showCreateOrEditDialog(id?: number): void {
    let createOrEditDialog: BsModalRef;
    if (!id) {
      createOrEditDialog = this.modalService.show(
        CreatePatientDialogComponent,
        {
          class: "modal-xl",
        }
      );
    } else {
      createOrEditDialog = this.modalService.show(
        EditPatientDialogComponent,
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

}
