export interface LangsResponse {
    data: LangResponseData[];
    links:LangsResponseLinks;
    meta: LangsResponseMeta;
}

export interface LangResponseData {
    type:      string;
    id:        string;
    attribute: LangAttribute;
    links:     LangLinks;
}

export interface LangAttribute {
    id:               string;
    name:             string;
    active:           number;
    iso_code:         string;
    language_code:    string;
    locale:           string;
    date_format_lite: string;
    date_format_full: string;
    is_rtl:           number;
    sites:            Site[];
}

export interface Site {
    id:    number;
    value: string;
}

export interface LangLinks {
    self: string;
}

export interface LangsResponseLinks {
    first: string;
    last:  string;
    prev:  null;
    next:  null;
}

export interface LangsResponseMeta {
    current_page: number;
    from:         number;
    last_page:    number;
    links:        LangsMetaLink[];
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

export interface LangsMetaLink {
    url:    null | string;
    label:  string;
    active: boolean;
}
