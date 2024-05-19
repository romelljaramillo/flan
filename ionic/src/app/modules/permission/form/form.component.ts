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
import { addIcons } from "ionicons";
import { trashOutline } from "ionicons/icons";

import { FieldModel } from "@shared/components/form/fields";
import { FieldsComponent } from "@shared/components/form/fields/fields.component";
import { PermissionService } from '../../permission/services/permission.service';
import { PermissionAttribute } from "@modules/permission/interfaces/permission.interface";
import { NotificationService } from "@shared/services/notification.service";

@Component({
  selector: "app-form-role",
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
  public permission!: PermissionAttribute;
  public previewImage = signal("" as string | null);

  private permissionService = inject(PermissionService);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);
  private menuCtrl = inject(MenuController);
  protected notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);

  form: FormGroup;

  constructor() {
    addIcons({ trashOutline });

    this.form = this.fb.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      description: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ]
    });
  }

  ngOnInit() {
    const permissionId = this.route.snapshot.paramMap.get("id");
    if(permissionId) {
      this.openMenu();
      this.getPeromision(permissionId);
    }
  }

  getPeromision(id: string | null) {
    if (!id) return;

    this.permissionService.getById(id).subscribe((response) => {
      if (response.data && !(response.data instanceof Array)) {
        this.permission = response.data.attribute as PermissionAttribute;

        this.form.patchValue({
          id: this.permission.id,
          name: this.permission.name,
          description: this.permission.description,
          created: this.permission.created,
          updated: this.permission.updated,
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

    if (this.permission && this.permission.id && this.permission.id.trim()) {
      this.update(data);
    } else {
      this.add(data);
    }
  }

  add(data: PermissionAttribute) {
    this.permissionService.create(data).subscribe((response) => {
      if (response.data && !(response.data instanceof Array)) {
        const item = response.data.attribute as PermissionAttribute;
        this.router.navigate([`/admin/${this.permissionService.entity}/edit/`, item.id]);
        this.notificationService?.success("Add role successful.");
        this.permissionService.saveEvent.emit(true);
      }
    });
  }

  update(data: PermissionAttribute) {
    if (!this.permission.id) return;

    const differences = this.getDifferences(this.permission, data);

    this.permissionService.update(this.permission.id, differences).subscribe((response) => {
      this.notificationService?.success("Update successful.");
      this.permissionService.saveEvent.emit(true);
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
    this.menuCtrl.open(this.permissionService.entity);
  }

  closeMenu() {
    this.menuCtrl.close(this.permissionService.entity);
    this.router.navigate([`/admin/${this.permissionService.entity}`]);
  }

  ngOnDestroy(): void {
    this.menuCtrl.close("permissions");
  }
}
