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