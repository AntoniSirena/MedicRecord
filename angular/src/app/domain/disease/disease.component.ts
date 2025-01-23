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
import { DiseaseDto, DiseasePagedResultDto } from "@shared/models/disease-model";
import { DiseaseService } from "@shared/services/disease.service";
import { CreateDiseaseDialogComponent } from "./create-disease/create-disease-dialog/create-disease-dialog.component";
import { EditDiseaseDialogComponent } from "./edit-disease/edit-disease-dialog/edit-disease-dialog.component";

@Component({
  selector: 'app-disease',
  templateUrl: './disease.component.html',
  styleUrl: './disease.component.css',
  animations: [appModuleAnimation()],
})
export class DiseaseComponent extends PagedListingComponentBase<DiseaseDto> {

  diseases: DiseaseDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;
  @ViewChild("dataTable", { static: true }) dataTable: Table;
  @ViewChild("paginator", { static: true }) paginator: Paginator;


  constructor(
    injector: Injector,
    private diseaseService: DiseaseService,
    private _modalService: BsModalService,
    private _activatedRoute: ActivatedRoute,
    cd: ChangeDetectorRef
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

    this.diseaseService
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
      .subscribe((result: DiseasePagedResultDto) => {
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.hideLoadingIndicator();
        this.cd.detectChanges();
      });
  }

  delete(input: DiseaseDto): void {
    abp.message.confirm(
      this.l("AreYouSureWantToDelete", input.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this.diseaseService
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

  edit(input: DiseaseDto): void {
    this.showCreateOrEditDialog(input.id);
  }

  showCreateOrEditDialog(id?: number): void {
    let createOrEditDialog: BsModalRef;
    if (!id) {
      createOrEditDialog = this._modalService.show(
        CreateDiseaseDialogComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        EditDiseaseDialogComponent,
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

}
