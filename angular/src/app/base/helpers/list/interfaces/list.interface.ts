export interface FieldResponseList {
  success: boolean;
  data:    FieldData;
  message: string;
}

export interface FieldData {
  fields: FieldList[];
}

export interface FieldList {
  key:   string;
  label:   string;
  type?:    string; // 'select', 'boolean', 'date', 'datetime', 'decimal', 'float', 'percent', 'editable', 'price'
  align?:   string; // 'left', 'center', 'right'
  class?:   string; // CSS
  orderby?: boolean;
  search?:  boolean;
  searchAdvance?: boolean;
  list?:  boolean;
  optionsSearch: Array<boolean>;
}

// export interface ColumnOrderBy {
//   column?: string;
//   orderBy?: string;
// }