
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HasRoleDirective } from '../role/directives/hasrole.directive';
import { AuthRoutingModule } from './auth.routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HasRoleDirective
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  providers: [AuthService, AuthGuard, LoginGuard],
})
export class AuthModule { }