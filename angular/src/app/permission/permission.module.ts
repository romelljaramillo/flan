import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionComponent } from './permission.component';
import { HelpersModule } from "../base/helpers/helpers.module";
import { PermissionRoutingModule } from './permission-routing.module';


@NgModule({
    declarations: [
        PermissionComponent
    ],
    imports: [
        CommonModule,
        HelpersModule,
        PermissionRoutingModule
    ]
})
export class PermissionModule { }
