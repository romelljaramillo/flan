import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteComponent } from './site.component';
import { HelpersModule } from "../base/helpers/helpers.module";
import { SiteRoutingModule } from './site-routing.module';

@NgModule({
    declarations: [
        SiteComponent
    ],
    imports: [
        CommonModule,
        HelpersModule,
        SiteRoutingModule
    ]
})
export class SiteModule { }
