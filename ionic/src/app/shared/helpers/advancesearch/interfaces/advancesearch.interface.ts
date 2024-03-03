export interface DataSearch {
  field: string;
  option: string;
  value: string;
}

export interface OptionsSearchResponse {
  success: string;
  data:    FilterOptions[];
  message: string;
}

export interface FilterOptions {
  option:      string;
  description: string;
}
