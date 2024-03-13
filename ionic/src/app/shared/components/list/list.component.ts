import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterContentChecked,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';

import { DataSearch } from '../advancesearch/interfaces/advancesearch.interface';
import { FieldList, OptionsQuery } from './interfaces/list.interface';
import { AdvancesearchComponent } from '../advancesearch/advancesearch.component';
import { BaseResponseData } from 'src/app/core/interfaces/base.interface';
import { NotificationService } from '@shared/services/notification.service';
import { NoimagePipe } from '@shared/pipes/noimage.pipe';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonList,
  IonItemGroup,
  IonItem,
  IonLabel,
  IonAvatar,
  IonIcon,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonButtons,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  alertCircle,
  createOutline,
  trashOutline,
  checkmarkCircle,
  closeCircle,
  arrowDown,
  arrowUp,
  chevronBackOutline,
  chevronForwardOutline,
  searchOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    IonTitle,
    IonToolbar,
    IonButtons,
    IonSearchbar,
    IonCol,
    IonRow,
    IonGrid,
    IonText,
    IonButton,
    IonIcon,
    IonAvatar,
    IonLabel,
    IonItem,
    IonItemGroup,
    IonList,
    IonInput,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    CommonModule,
    FormsModule,
    AdvancesearchComponent,
    NoimagePipe,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent
  implements AfterContentChecked
{
  @ViewChild('terminoSearch') terminoSearch!: ElementRef;

  @ViewChild('searchbar') searchbar!: IonSearchbar;
  searchControl = new FormControl('');
  searchTerm = '';

  @Input() fields!: FieldList[];
  @Input() items: any[] = [];
  @Input() total: number = 0;
  @Input() isAdvanceSearch: boolean = true;
  @Input() editable: boolean = false;
  @Input() deletable: boolean = false;

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() filter = new EventEmitter<OptionsQuery>();

  totalPages: number = 0;

  filters: OptionsQuery = {
    page: 1,
    perPage: 10,
    orderBy: 'DESC',
    column: 'id',
    filter: '',
    filterAdvance: [],
  };

  constructor(private notificationService?: NotificationService) {
    addIcons({
      alertCircle,
      createOutline,
      trashOutline,
      checkmarkCircle,
      closeCircle,
      arrowDown,
      arrowUp,
      chevronBackOutline,
      chevronForwardOutline,
      searchOutline,
    });
  }

  ngAfterContentChecked() {
    this.totalPages = Math.ceil(this.total / this.filters.perPage);
  }

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

  onFilterEven() {
    const searchTerm = this.searchTerm;
    this.resetFilters();
    this.filters.page = 1;
    this.filters.filter = searchTerm;
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
    this.searchControl.setValue('');
    this.filters.filterAdvance = [];
  }

  editAction(item: any) {
    console.log('editAction', item);

    this.edit.emit(item);
  }

  async deleteAction(item: any) {
    const message = '¿Estás seguro de que deseas eliminar este elemento?';
    const options = {
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      onConfirm: () => {
        this.delete.emit(item);
      },
      onCancel: () => {
        return;
      }
    };

    await this.notificationService?.confirm(message, options);
  }

  previousPage() {
    if (this.filters.page > 1) {
      this.filters.page--;
      this.emitFilters();
    }
  }

  nextPage() {
    if (this.filters.page < this.totalPages) {
      this.filters.page++;
      this.emitFilters();
    }
  }
}
