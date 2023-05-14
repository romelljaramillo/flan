import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { HelpersModule } from '../base/helpers/helpers.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [
        UserComponent,
    ],
    exports: [],
    imports: [
        CommonModule,
        HelpersModule,
        UserRoutingModule
    ]
})
export class UserModule { }
