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
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

    this.loginForm = this.fb.group({
      email: new FormControl('admin@example.com', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
      ]),
      password: new FormControl('password', Validators.required),
      remember: new FormControl(false),
    });
  }

  get isEmailValid() {
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
  }

  login() {
    this.loading = true;

    const { redirectTo } = this.route.snapshot.queryParams;

    if (redirectTo) {
      this.redirectTo = redirectTo;
    }

    this.authService.postLogin(this.loginForm.value).subscribe(
      (response) => {
        if (this.loginForm.value.remember) {
          localStorage.setItem('email', this.loginForm.value.email);
        } else {
          localStorage.removeItem('email');
        }

        this.loading = false;
        console.log(this.redirectTo);

        this.router.navigateByUrl(this.redirectTo);
      },
      (error) => {
        console.log(error);

        this.loading = false;
      }
    );
  }
}
