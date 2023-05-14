import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
//List
import { ListComponent } from './list/list.component';
import { NoimagePipe } from 'src/app/shared/pipes/noimage.pipe';
//AdvanceSearch
import { AdvancesearchComponent } from './advancesearch/advancesearch.component';
// Form
import { HelperFormModule } from './form/helper-form.module';
import { AuthModule } from '../../auth/auth.module';


@NgModule({
  declarations: [
    ListComponent,
    AdvancesearchComponent,
    NoimagePipe
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HelperFormModule,
    AuthModule
  ],
  exports: [ListComponent, AdvancesearchComponent, HelperFormModule],
})
export class HelpersModule {}
