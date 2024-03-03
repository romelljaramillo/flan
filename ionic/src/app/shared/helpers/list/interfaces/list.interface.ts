import { DataSearch } from "../../advancesearch/interfaces/advancesearch.interface";

export interface OptionsQuery {
  page: number; // pagina actual
  perPage: number; // registros por pagina
  orderBy: string; // ordena DESC | ASC
  column:string; // columna de ordenamiento
  filter: string; // filtros para la busqueda "campo = termino"
  filterAdvance: DataSearch[];
}

export interface filters {
  field: string[]; // campo afectado
  option: string[]; // opciones  = | > | < | <= | >= | !=
  value: string[]; // valor a buscar
}

export interface FieldResponseList {
  success: string;
  data:    FieldData;
  message: string;
}

export interface FieldData {
  fields:    FieldList[];
  deletable: boolean;
  editable:  boolean;
}

export interface FieldList {
  key:            string;
  label:          string;
  type?:          string; // 'select', 'boolean', 'date', 'datetime', 'decimal', 'float', 'percent', 'editable', 'price'
  align?:         string; // 'left', 'center', 'right'
  class?:         string; // CSS
  orderby?:       boolean;
  search?:        boolean;
  searchAdvance?: boolean;
  list?:          boolean;
  order:          number;
  optionsSearch:  OptionsSearch | undefined;
}

export interface OptionsSearch {
  minorOrEqual: boolean;
  majorOrEqual: boolean;
  minor:        boolean;
  major:        boolean;
  between:      boolean;
  notBetween:   boolean;
  in:          boolean;
  notIn:       boolean;
}