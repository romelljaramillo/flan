import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LangComponent } from './lang.component';
import { HelpersModule } from "../base/helpers/helpers.module";
import { LangRoutingModule } from './lang-routing.module';



@NgModule({
    declarations: [
        LangComponent
    ],
    imports: [
        CommonModule,
        HelpersModule,
        LangRoutingModule
    ]
})
export class LangModule { }
