export interface SitesResponse {
    data: SiteResponseData[];
    links:SitesResponseLinks;
    meta: SitesResponseMeta;
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
    deleted_at:    string|null;
}

export interface Site {
    id:    number;
    value: string;
}

export interface SiteLinks {
    self: string;
}

export interface SitesResponseLinks {
    first: string;
    last:  string;
    prev:  null;
    next:  null;
}

export interface SitesResponseMeta {
    current_page: number;
    from:         number;
    last_page:    number;
    links:        SitesMetaLink[];
    path:         string;
    per_page:     number;
    to:           number;
    total:        number;
}

export interface SitesMetaLink {
    url:    null | string;
    label:  string;
    active: boolean;
}
