export interface SiteResponse {
    data: SiteResponseData[];
    links:SiteResponseLinks;
    meta: SiteResponseMeta;
}

export interface SiteResponseData {
    type:      string;
    id:        string;
    attribute: SiteAttribute;
    links:     SiteLinks;
}

export interface SiteAttribute {
    id:            string;
    site_group_id: number;
    name:          string;
    color:         string;
    category_id:   number;
    theme_name:    string;
    active:        number;
    created_at:    string;
    updated_at:    string;
    deleted_at:    null | string;
}

export interface SiteLinks {
    self: string;
}

export interface SiteResponseLinks {
    first: string;
    last:  string;
    prev:  null | string;
    next:  string;
}

export interface SiteResponseMeta {
    current_page: number;
    from:         number;
    last_page:    number;
    links:        SiteMetaLink | undefined;
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

export interface SiteMetaLink {
    url:    null | string;
    label:  string;
    active: boolean;
}
