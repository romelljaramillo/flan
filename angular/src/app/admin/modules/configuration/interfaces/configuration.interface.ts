export interface ConfigurationResponse {
  data:  ConfigurationResponseData[];
  links: ConfigurationResponseLinks;
  meta:  ConfigurationResponseMeta;
}

export interface ConfigurationResponseData {
  type:      string;
  id:        string;
  attribute: ConfigurationAttribute;
  links:     ConfigurationLink;
}

export interface ConfigurationAttribute {
  id:                   string;
  site_group_id:        number;
  site_id:              number;
  name:                 string;
  value:                string;
  created:              string;
  updated:              string;
}

export interface ConfigurationLink {
  self: string;
}

export interface ConfigurationResponseLinks {
  first: string;
  last:  string;
  prev:  null | string;
  next:  string;
}

export interface ConfigurationResponseMeta {
  current_page: number;
  from:         number;
  last_page:    number;
  links:        ConfigurationMetaLink | undefined;
  path:         string;
  per_page:     number;
  to:           number;
  total:        number;
}

export interface ConfigurationMetaLink {
  url:    null | string;
  label:  string;
  active: boolean;
}
