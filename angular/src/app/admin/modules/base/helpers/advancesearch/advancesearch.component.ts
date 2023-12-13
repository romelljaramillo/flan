import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldList, OptionsSearch } from '../list/interfaces/list.interface';
import {
  DataSearch,
  FilterOptions,
} from './interfaces/advancesearch.interface';
import { AdvanceSearchService } from './services/advancesearch.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advancesearch',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './advancesearch.component.html',
  styles: [''],
})
export class AdvancesearchComponent implements OnInit {
  @ViewChild('closeModal') closeModal: any;

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
  ) {}

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

  filterAdd() {
    this.formFilterArray.push(this.filterAddNew());
  }

  filterAddNew() {
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
    this.closeModal.nativeElement.click();
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
}
