import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  IonContent,
  IonInput,
  IonLabel,
  IonButton,
  IonCardContent,
  IonItem,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonCheckbox,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoFacebook, logoGoogle,  } from 'ionicons/icons';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonIcon,
    IonText,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    IonCheckbox,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonCardContent,
    IonButton,
    IonLabel,
    IonInput,
    IonContent,
    IonCardContent,
  ],
})
export class LoginPage {
  loginForm!: FormGroup;
  loading: boolean = false;
  redirectTo = '/admin/dashboard';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  constructor() {
    addIcons({ logoGoogle, logoFacebook });
    this.createForm();
  }

  createForm(): void {
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
