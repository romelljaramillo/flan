import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationComponent } from './configuration.component';
import { HelpersModule } from '../base/helpers/helpers.module';
import { ConfigurationRoutingModule } from './configuration-routing.module';

@NgModule({
    declarations: [
        ConfigurationComponent,
    ],
    exports: [],
    imports: [
        CommonModule,
        HelpersModule,
        ConfigurationRoutingModule
    ]
})
export class ConfigurationModule { }
