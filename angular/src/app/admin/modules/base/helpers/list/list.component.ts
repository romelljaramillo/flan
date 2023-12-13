import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataSearch } from '../advancesearch/interfaces/advancesearch.interface';
import { FieldList, OptionsQuery } from './interfaces/list.interface';
import { BaseResponseData } from '../../interfaces/base.interface';
import { NotificationService } from '@adminShared/notification/notification.service';
import { AdvancesearchComponent } from '../advancesearch/advancesearch.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NoimagePipe } from '@adminShared/pipes/noimage.pipe';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdvancesearchComponent,
    NgbModule,
    NgbPaginationModule,
    NoimagePipe
  ],
  templateUrl: './list.component.html',
  styles: [''],
})
export class ListComponent<T extends BaseResponseData> implements OnInit {
  @ViewChild('terminoSearch') terminoSearch!: ElementRef;
  
  @Input() fields!: FieldList[];
  @Input() items: T[] = [];
  @Input() total: number = 0;
  @Input() isAdvanceSearch: boolean = true;
  @Input() editable: boolean = false;
  @Input() deletable: boolean = false;

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();
  @Output() filter = new EventEmitter<OptionsQuery>();
    
  filters: OptionsQuery  = {
    page: 1,
    perPage: 10,
    orderBy: 'DESC',
    column: 'id',
    filter: '',
    filterAdvance: [],
  };

  constructor(
    private notificationService?: NotificationService
  ) {}

  ngOnInit() {}

  emitFilters() {
    this.filter.emit(this.filters);
  }

  onPageChange(page: number) {
    this.filters.page = page;
    this.emitFilters();
  }

  onSortColumn(column: string) {
    this.filters.orderBy = this.filters.orderBy == 'DESC' ? 'ASC' : 'DESC';
    this.filters.column = column;
    this.emitFilters();
  }

  onFilterEven(termino: string) {
    this.resetFilters();
    this.filters.page = 1;
    this.filters.filter = termino;
    this.emitFilters();
  }

  onFilterAdvanceEven(dataSearch: DataSearch[]) {
    this.resetFilters();
    this.filters.page = 1;
    this.filters.filterAdvance = dataSearch;
    this.emitFilters();
  }

  onFilterPerPage(perPage: Event) {
    this.filters.perPage = Number(perPage);
    this.emitFilters();
  }

  resetFilters() {
    this.filters.filter = '';
    this.terminoSearch.nativeElement.value = '';
    this.filters.filterAdvance = [];
  }

  editAction(item: T) {
    this.edit.emit(item);
  }

  deleteAction(item: T) {
    this.notificationService?.confirm('Está seguro de eliminar?', {
      text: '¡No podrás revertir esto!',
    }).then((result: boolean = false) => {
      if (result) {
        this.delete.emit(item);
      }
    });
  }
}
