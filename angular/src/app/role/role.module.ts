import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleComponent } from './role.component';
import { HelpersModule } from '../base/helpers/helpers.module';
import { RoleRoutingModule } from './role-routing.module';

@NgModule({
    declarations: [
        RoleComponent,
    ],
    exports: [],
    imports: [
        CommonModule,
        HelpersModule,
        RoleRoutingModule
    ]
})
export class RoleModule { }
