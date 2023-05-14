import { DataSearch } from "../helpers/advancesearch/interfaces/advancesearch.interface";

export interface OptionsQuery {
  page: number; // pagina actual
  perPage: number; // registros por pagina
  orderBy: string; // ordena DESC | ASC
  column:string; // columna de ordenamiento
  filter: string; // filtros para la busqueda "campo = termino"
  filterAdvance: DataSearch[];
}

export interface filters {
  field: Array<string>; // campo afectado
  option: Array<string>; // opciones  = | > | < | <= | >= | !=
  value: Array<string>; // valor a buscar
}

export interface DefaultResponse {
  data:  DefaultResponseData;
  links: DefaultResponseLinks;
  meta:  DefaultResponseMeta;
}

export interface DefaultResponseData {
  type:      string;
  id:        string;
  attribute: any;
  links:     DefaultLink;
}

export interface DefaultLink {
  self: string;
}

export interface DefaultResponseLinks {
  first: string;
  last:  string;
  prev:  null | string;
  next:  string;
}

export interface DefaultResponseMeta {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        DefaultMetaLink[];
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface DefaultMetaLink {
  url:    null | string;
  label:  string;
  active: boolean;
}
