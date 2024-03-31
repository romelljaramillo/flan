export interface LangAttribute {
    id:               string;
    name:             string;
    image:            string;
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