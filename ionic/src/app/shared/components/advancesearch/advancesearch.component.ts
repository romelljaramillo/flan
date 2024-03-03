import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { FieldList, OptionsSearch } from '../list/interfaces/list.interface';
import {
  DataSearch,
  FilterOptions,
} from './interfaces/advancesearch.interface';
import { AdvanceSearchService } from './services/advancesearch.service';
import { CommonModule } from '@angular/common';
import {
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonButton,
  IonModal,
  IonContent,
  IonButtons,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonFooter,
  IonCol,
  IonItem,
  IonLabel,
  IonRow,
  IonGrid,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { refreshOutline, filterOutline, closeOutline, addOutline, removeOutline } from 'ionicons/icons';
import { IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-advancesearch',
  standalone: true,
  imports: [
    IonSelect,
    IonSelectOption,
    IonInput,
    IonGrid,
    IonRow,
    IonLabel,
    IonItem,
    IonCol,
    IonFooter,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonContent,
    IonModal,
    IonButton,
    IonIcon,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './advancesearch.component.html',
  styles: [''],
})
export class AdvancesearchComponent implements OnInit {
  // @ViewChild('modal') modal!: ElementRef;
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('formRef') formRef!: NgForm;
  isModalOpen = false;

  @Output() filterSearch = new EventEmitter<DataSearch[]>();

  form!: FormGroup;
  formFilter!: FormGroup;
  search!: DataSearch[];
  isModalActive: boolean = false;
  valor: string = '';

  @Input() fields!: FieldList[];

  filterOptions: FilterOptions[] = [];

  constructor(
    private fb: FormBuilder,
    private advanceSearchService: AdvanceSearchService
  ) {
    addIcons({ refreshOutline, filterOutline, closeOutline, addOutline, removeOutline });
  }

  get formFilterArray() {
    return this.form.get('filter') as FormArray;
  }

  ngOnInit(): void {
    this.formFilter = this.filterAddNew();

    this.form = this.fb.group({
      filter: this.fb.array([]),
    });
  }

  getOptions(option: string) {
    const nameOptionsSearch = this.fields.find(
      (item) => item.key === option
    )?.optionsSearch;
    this.setFilterOptions(nameOptionsSearch);
  }

  setFilterOptions(optionsSearch: OptionsSearch | undefined): void {
    this.filterOptions = [];
    this.advanceSearchService
      .getOptionsSearch()
      .subscribe((filter: FilterOptions[]) => {
        if (optionsSearch !== undefined) {
          filter.forEach((item) => {
            const optionKey = item.option as keyof OptionsSearch;
            if (optionsSearch[optionKey] !== false) {
              this.filterOptions.push(item);
            }
          });
        } else {
          this.filterOptions = filter;
        }
      });
  }

  filterAdd(): void {
    this.formFilterArray.push(this.filterAddNew());
  }

  filterAddNew(): FormGroup {
    return this.fb.group({
      field: [''],
      option: [''],
      value: [''],
    });
  }

  filterRemove(index: number): void {
    this.formFilterArray.removeAt(index);
  }

  filterRemoveAll(): void {
    const rows = this.formFilterArray.length;
    for (let i = 0; i < rows; i++) {
      this.formFilterArray.removeAt(i);
    }
  }

  resetSearch() {
    this.filterRemoveAll();
    let filters: DataSearch[] = [];
    this.filterSearch.emit(filters);
  }

  getSearch() {
    this.modal.dismiss(null, 'cancel');
    
    this.search = this.form.get('filter')?.value ?? '';

    let filters: DataSearch[] = [];
    this.search.forEach((item: DataSearch) => {
      if (!item.field || !item.option) {
        return;
      }
      filters.push(item);
    });
    
    this.filterSearch.emit(filters);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
