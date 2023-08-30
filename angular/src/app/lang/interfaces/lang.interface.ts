export interface LangResponse {
    data: LangResponseData[];
    links:LangResponseLinks;
    meta: LangResponseMeta;
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

export interface LangResponseLinks {
    first: string;
    last:  string;
    prev:  null | string;
    next:  string;
}

export interface LangResponseMeta {
    current_page: number;
    from:         number;
    last_page:    number;
    links:        LangMetaLink | undefined;
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

export interface LangMetaLink {
    url:    null | string;
    label:  string;
    active: boolean;
}
