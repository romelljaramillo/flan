import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [''],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  redirectTo = '/dashboard';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('admin@example.com', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        Validators.email,
      ]),
      password: new FormControl('password', Validators.required),
      remember: new FormControl(false),
    });
  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  /* get isEmailValid() {
    return (
      this.loginForm.controls['email'].valid ||
      !this.loginForm.controls['email'].touched
    );
  }

  get isPasswordValid() {
    return (
      this.loginForm.controls['password'].valid ||
      !this.loginForm.controls['password'].touched
    );
  } */

  signIn(): void {
    this.loading = true;

    const { email, password, remember } = this.loginForm.value;

    this.setRedirectUrl();

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.handleRememberOption(email, remember);
        this.loading = false;
      },
      error: () => {
        this.loginForm.setErrors({ invalidCredentials: true });
        this.loading = false;
      },
    });
  }

  private setRedirectUrl(): void {
    const { redirectTo } = this.route.snapshot.queryParams;
    if (redirectTo) {
      this.redirectTo = redirectTo;
    }
  }

  private handleRememberOption(email: string, remember: boolean): void {
    if (remember) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }
  }
}
