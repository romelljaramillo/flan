import { CommonModule } from "@angular/common";
import { Router, RouterModule, ActivatedRoute } from "@angular/router";

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import {
  IonInput,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonThumbnail,
  IonButtons,
  IonToolbar,
  MenuController,
  IonIcon,
  IonRadioGroup,
  IonAvatar,
  IonToggle,
} from "@ionic/angular/standalone";
import { FieldModel } from "@shared/components/form/fields";
import { UserService } from "../services/user.service";
import { UserAttribute } from "../interfaces/user.interface";
import { FieldsComponent } from "@shared/components/form/fields/fields.component";
import { RoleService } from "@modules/role/services/role.service";
import { Role } from "@modules/role/interfaces/role.interface";
import { NotificationService } from "@shared/services/notification.service";
import { addIcons } from "ionicons";
import { trashOutline } from "ionicons/icons";

@Component({
  selector: "app-form-user",
  standalone: true,
  imports: [
    IonAvatar,
    IonRadioGroup,
    IonIcon,
    IonToolbar,
    IonToggle,
    IonButtons,
    IonButton,
    IonImg,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonThumbnail,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FieldsComponent,
  ],
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit, OnDestroy {
  public fields!: FieldModel<string>[];
  public user!: UserAttribute;
  public roles: Role[] = [];
  public previewImage = signal("" as string | null);

  private userService = inject(UserService);
  private roleService = inject(RoleService);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);
  private menuCtrl = inject(MenuController);
  protected notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);
  protected avatarFile: File | null = null;

  form: FormGroup;

  constructor() {
    addIcons({ trashOutline });

    /* this.form = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      first_name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      last_name: [
        "",
        [
          Validators.required,
          Validators.maxLength(25),
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"),
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      password: ["", [Validators.minLength(8), Validators.maxLength(255)]],
      active: [0],
      roles: [[]],
      avatar: [null],
    }); */
    this.form = this.fb.group({
      name: [
        "romell",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      first_name: [
        "Romell",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      last_name: ["Jaramillo", [Validators.required, Validators.maxLength(25)]],
      email: [
        "romell@roanja.com",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"),
          Validators.minLength(5),
          Validators.maxLength(255),
        ],
      ],
      password: [
        "password",
        [Validators.minLength(8), Validators.maxLength(255)],
      ],
      active: [1],
      roles: [[1, 2]],
      avatar: [null],
    });
    this.getRoles();
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get("id");
    if(userId) {
      this.openMenu();
      this.getUser(userId);
    }
  }

  getRoles() {
    this.roleService.getRoles().subscribe((response) => {
      this.roles = response;
    });
  }

  getUser(id: string | null) {
    if (!id) return;

    this.userService.getById(id).subscribe((response) => {
      if (response.data && !(response.data instanceof Array)) {
        this.user = response.data.attribute as UserAttribute;
        this.previewImage.set(this.user.avatar);

        this.form.patchValue({
          id: this.user.id,
          name: this.user.name,
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
          active: this.user.active,
          avatar: this.user.avatar,
          roles: this.user.roles.map((role: any) => role.id),
        });
      }
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    const data = this.form.value;
    if (!data) return;

    if (this.user && this.user.id && this.user.id.trim()) {
      this.update(data);
    } else {
      this.add(data);
    }
  }

  add(data: UserAttribute) {
    this.userService.create(data).subscribe((response) => {
      if (response.data && !(response.data instanceof Array)) {
        const item = response.data.attribute as UserAttribute;
        this.router.navigate([`/admin/${this.userService.entity}/edit/`, item.id]);
        this.notificationService?.success("Add user successful.");
        this.userService.saveEvent.emit(true);
      }
    });
  }

  update(data: UserAttribute) {
    if (!this.user.id) return;

    const differences = this.getDifferences(this.user, data);

    this.userService.update(this.user.id, differences).subscribe((response) => {
      this.notificationService?.success("Update successful.");
      this.userService.saveEvent.emit(true);
    });
  }

  getDifferences(data: any, dataForm: any): any {
    const differences: any = {};

    Object.keys(dataForm).forEach((key) => {
      if (data.hasOwnProperty(key) && data[key] !== dataForm[key]) {
        differences[key] = dataForm[key];
      }
    });

    return differences;
  }

  openMenu() {
    this.menuCtrl.open(this.userService.entity);
  }

  closeMenu() {
    this.menuCtrl.close(this.userService.entity);
    this.router.navigate([`/admin/${this.userService.entity}`]);
  }

  ngOnDestroy(): void {
    this.menuCtrl.close("users");
  }

  onAvatarChange(file: File | Event) {
    if (file instanceof File) {
      this.avatarFile = file;
    } else {
      const fileUpload = file.target as HTMLInputElement;
      if (fileUpload.files && fileUpload.files.length > 0) {
        this.avatarFile = fileUpload.files[0];
      }
    }

    if (!this.avatarFile) {
      this.previewImage.set(null);
      return;
    }

    this.form.patchValue({ avatar: this.avatarFile });

    if (this.form.get("avatar")) {
      this.form.get("avatar")!.updateValueAndValidity();
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.avatarFile);

    reader.onload = () => {
      this.previewImage.set(reader.result as string);
    };
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.onAvatarChange(files[0]);
    }
  }

  deleteAvatar() {
    this.previewImage.set(null);
    this.form.patchValue({ avatar: null });
  }
}
