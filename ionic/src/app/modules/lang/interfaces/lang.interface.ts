export interface LangAttribute {
    id:               string;
    name:             string;
    image:            string;
    active:           boolean;
    iso_code:         string;
    language_code:    string;
    date_format_lite: string;
    date_format_full: string;
    is_rtl:           boolean;
    sites:            Site[];
}

export interface Site {
    id:    number;
    value: string;
}