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
import { MedicalCenterDto, MedicalCenterPagedResultDto } from "@shared/models/medical-center-model";
import { PagedListingComponentBase } from "@shared/paged-listing-component-base";
import { MedicalCenterService } from "@shared/services/medical-center.service";
import { CreateMedicalCenterDialogComponent } from "./create-medical-center/create-medical-center-dialog/create-medical-center-dialog.component";
import { EditMedicalCenterDialogComponent } from "./edit-medical-center/edit-medical-center-dialog/edit-medical-center-dialog.component";

@Component({
  selector: 'app-medical-center',
  templateUrl: './medical-center.component.html',
  styleUrl: './medical-center.component.css',
  animations: [appModuleAnimation()],
})


export class MedicalCenterComponent extends PagedListingComponentBase<MedicalCenterDto> {

  medicalCenters: MedicalCenterDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;
  @ViewChild("dataTable", { static: true }) dataTable: Table;
  @ViewChild("paginator", { static: true }) paginator: Paginator;


  constructor(
    injector: Injector,
    private _medicalCenterService: MedicalCenterService,
    private _modalService: BsModalService,
    private _activatedRoute: ActivatedRoute,
    cd: ChangeDetectorRef,
    ) {
    super(injector, cd);
    this.keyword = this._activatedRoute.snapshot.queryParams["keyword"] || "";
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

    this._medicalCenterService
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
      .subscribe((result: MedicalCenterPagedResultDto) => {
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.hideLoadingIndicator();
        this.cd.detectChanges();
      });
  }

  delete(input: MedicalCenterDto): void {
    abp.message.confirm(
      this.l("AreYouSureWantToDelete", input.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._medicalCenterService
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
    this.showCreateOrEditMedicalCenterDialog();
  }

  edit(input: MedicalCenterDto): void {
    this.showCreateOrEditMedicalCenterDialog(input.id);
  }


  showCreateOrEditMedicalCenterDialog(id?: number): void {
    let createOrEditDialog: BsModalRef;
    if (!id) {
      createOrEditDialog = this._modalService.show(
        CreateMedicalCenterDialogComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        EditMedicalCenterDialogComponent,
        {
          class: "modal-lg",
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

  clearFilters(): void {
    this.keyword = "";
    this.isActive = undefined;
  }

}
