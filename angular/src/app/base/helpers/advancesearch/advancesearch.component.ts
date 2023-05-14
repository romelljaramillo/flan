import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldList } from '../list/interfaces/list.interface';
import {
  DataSearch,
  FilterOptions,
} from './interfaces/advancesearch.interface';
import { AdvanceSearchService } from './services/advancesearch.service';

@Component({
  selector: 'app-advancesearch',
  templateUrl: './advancesearch.component.html',
  styles: ['']
})
export class AdvancesearchComponent {
  @ViewChild('closeModal') closeModal: any;

  @Output() filterSearch = new EventEmitter<DataSearch[]>();

  form!: FormGroup;
  formFilter!: FormGroup;
  search!: DataSearch[];
  isModalActive: boolean = false;
  valor: string = '';

  @Input() fields: FieldList[] = [];

  filterOptions: FilterOptions[] = [];

  constructor(
    private fb: FormBuilder,
    private advanceSearchService: AdvanceSearchService
  ) {}

  get formFilterArray() {
    return this.form.get('filter') as FormArray;
  }

  getOptions(option: string) {
    const optionsSearch = this.fields
                          .filter((field) => field.key == option)
                          .map((field) => field.optionsSearch );

    this.setFilterOptions(optionsSearch[0]);
  }

  setFilterOptions(optionsSearch: any) {
    this.filterOptions = [];
    this.advanceSearchService.getOptionsSearch().subscribe((filter) => {
      filter.forEach((options) => {
        if (!optionsSearch || optionsSearch[options.option] !== false) {
          this.filterOptions.push(options);
        }
      });
    });
  }

  ngOnInit(): void {
    this.formFilter = this.filterAddNew();

    this.form = this.fb.group({
      filter: this.fb.array([]),
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
  
  resetSearch(){
    this.filterRemoveAll();
    let filters: DataSearch[] = [];
    this.filterSearch.emit(filters);
  }

  getSearch() {
    // if (this.search == this.form.get('filter')?.value) {
    //   return;
    // }

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
