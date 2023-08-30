export interface BaseResponse {
  data:  BaseResponseData[] | BaseResponseData;
  links?: BaseResponseLinks;
  meta?:  BaseResponseMeta;
}

export interface BaseResponseData {
  type:      string;
  id:        string;
  attribute: { [key: string]: any };
  links:     BaseLink;
}

export interface BaseAttribute {
  id?:       string;
}

export interface BaseLink {
  self: string;
}

export interface BaseResponseLinks {
  first: string;
  last:  string;
  prev:  null | string;
  next:  string;
}

export interface BaseResponseMeta {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        BaseMetaLink | undefined;
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface BaseMetaLink {
  url:    null | string;
  label:  string;
  active: boolean;
}
