import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DataSearch } from '../advancesearch/interfaces/advancesearch.interface';
import { FormService } from '../form/services/form.service';
import { ListService } from './services/list.service';
import { OptionsQuery } from '../../interfaces/base.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActionCrud } from '../../../permission/interfaces/permission.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [''],
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('terminoSearch') terminoSearch!: ElementRef;
  @Input() isAdvanceSearch: boolean = true;

  filters: OptionsQuery = {
    page: 1,
    perPage: 10,
    orderBy: 'DESC',
    column: 'id',
    filter: '',
    filterAdvance: [],
  };

  private fieldsSubscription: Subscription;

  public canEdit: boolean = false;
  public canDelete: boolean = false;

  constructor(
    public listService: ListService,
    private formService: FormService,
    public authService: AuthService
  ) {
    this.fieldsSubscription = this.listService.filters.subscribe((filters) => {
      this.filters = filters;
    });
  }

  ngOnInit() {
    console.log(this.authService.entity);
    this.permissions();
  }

  private permissions() {
    this.authService
      .checkPermission({
        entity: this.authService.entity,
        action: ActionCrud.edit,
      })
      .subscribe((canEdit) => (this.canEdit = canEdit));
    this.authService
      .checkPermission({
        entity: this.authService.entity,
        action: ActionCrud.edit,
      })
      .subscribe((canDelete) => (this.canDelete = canDelete));
  }

  emitFilters() {
    this.listService.filters.emit(this.filters);
  }

  pageChanget(page: number) {
    this.filters.page = page;
    this.emitFilters();
  }

  sortColumn(column: string) {
    this.filters.orderBy = this.filters.orderBy == 'DESC' ? 'ASC' : 'DESC';
    this.filters.column = column;
    this.emitFilters();
  }

  filterEven(termino: string) {
    this.resetFilters();
    this.filters.page = 1;
    this.filters.filter = termino;
    this.emitFilters();
  }

  filterAdvanceEven(dataSearch: DataSearch[]) {
    this.resetFilters();
    this.filters.page = 1;
    this.filters.filterAdvance = dataSearch;
    this.emitFilters();
  }

  filterPerPage(perPage: number) {
    this.filters.perPage = perPage;
    this.emitFilters();
  }

  resetFilters() {
    this.filters.filter = '';
    this.terminoSearch.nativeElement.value = '';
    this.filters.filterAdvance = [];
  }

  editAction(id: string) {
    this.formService.initForm.emit({ active: true, id: id });
  }

  deleteAction(id: string) {
    this.listService.deleteAction.emit(id);
  }

  ngOnDestroy() {
    this.fieldsSubscription?.unsubscribe();
  }
}
