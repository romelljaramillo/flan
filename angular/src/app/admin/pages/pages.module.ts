import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

import { PagesComponent } from './pages.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';
import { LoginGuard } from 'src/app/auth/guards/login.guard';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule
  ],
  providers: [AuthService, AuthGuard, LoginGuard],
})
export class PagesModule { }
