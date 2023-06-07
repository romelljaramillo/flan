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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [''],
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('terminoSearch') terminoSearch!: ElementRef;

  filters: OptionsQuery = {
    page: 1,
    perPage: 10,
    orderBy: 'DESC',
    column: 'id',
    filter: '',
    filterAdvance: [],
  };

  private fieldsSubscription: Subscription;

  constructor(
    public listService: ListService,
    private formService: FormService,
  ) {
    this.fieldsSubscription = this.listService.filters.subscribe((filters) => {
      this.filters = filters;
    });
  }
  
  ngOnInit() {}

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
    this.filters.page = 1;
    this.resetFilters();
    this.filters.filter = termino;
    this.emitFilters();
  }

  filterAdvanceEven(dataSearch: DataSearch[]) {
    this.resetFilters();
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
