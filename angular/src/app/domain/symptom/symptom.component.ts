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
import { SymptomDto, SymptomPagedResultDto } from "@shared/models/symptom-model";
import { SymptomService } from "@shared/services/symptom.service";
import { PagedListingComponentBase } from "@shared/paged-listing-component-base";
import { CreateSymptomDialogComponent } from './create-symptom/create-symptom-dialog/create-symptom-dialog.component';
import { EditSymptomDialogComponent } from './edit-symptom/edit-symptom-dialog/edit-symptom-dialog.component';


@Component({
  selector: 'app-symptom',
  templateUrl: './symptom.component.html',
  styleUrl: './symptom.component.css',
  animations: [appModuleAnimation()],
})
export class SymptomComponent extends PagedListingComponentBase<SymptomDto> {

  symptoms: SymptomDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;
  @ViewChild("dataTable", { static: true }) dataTable: Table;
  @ViewChild("paginator", { static: true }) paginator: Paginator;


  constructor(
    injector: Injector,
    private symptomService: SymptomService,
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

    this.symptomService
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
      .subscribe((result: SymptomPagedResultDto) => {
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.hideLoadingIndicator();
        this.cd.detectChanges();
      });
  }

  delete(input: SymptomDto): void {
    abp.message.confirm(
      this.l("AreYouSureWantToDelete", input.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this.symptomService
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

  edit(input: SymptomDto): void {
    this.showCreateOrEditDialog(input.id);
  }


  showCreateOrEditDialog(id?: number): void {
    let createOrEditDialog: BsModalRef;
    if (!id) {
      createOrEditDialog = this._modalService.show(
        CreateSymptomDialogComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditDialog = this._modalService.show(
        EditSymptomDialogComponent,
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
