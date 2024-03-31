import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  IonContent,
  IonInput,
  IonGrid,
  IonCol,
  IonImg,
  IonRow,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoFacebook, logoGoogle, chevronBackOutline } from 'ionicons/icons';

import { ValidatorsService } from '../../../shared/services/validators.service';
import { UserService } from '@modules/user/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    IonInput,
    IonIcon,
    IonButton,
    IonLabel,
    IonItem,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonRow,
    IonImg,
    IonCol,
    IonGrid,
    IonContent,
  ],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private validatorsService = inject(ValidatorsService);

  constructor() {
    addIcons({ logoGoogle, logoFacebook, chevronBackOutline });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group(
      {
        first_name: ['romell', Validators.required],
        last_name: ['jaramillo', Validators.required],
        name: ['romell', Validators.required],
        email: [
          'romelljaramillo@gmail.com',
          [
            Validators.required,
            Validators.email,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', Validators.required],
      },
      {
        validators: [
          this.validatorsService.matchPassword('password', 'confirm_password'),
        ],
      }
    );
  }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Formulario de Registro:', this.registerForm.value);
      // Aquí manejarías la lógica de registro, como enviar los datos a un servidor
    }
  }
}
