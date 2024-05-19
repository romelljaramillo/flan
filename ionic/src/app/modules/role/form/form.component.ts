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
import { RoleAttribute } from "@modules/role/interfaces/role.interface";
import { FieldsComponent } from "@shared/components/form/fields/fields.component";
import { PermissionService } from '../../permission/services/permission.service';
import { Permission } from "@modules/permission/interfaces/permission.interface";
import { RoleService } from "@modules/role/services/role.service";
import { NotificationService } from "@shared/services/notification.service";
import { addIcons } from "ionicons";
import { trashOutline } from "ionicons/icons";

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
  public role!: RoleAttribute;
  public permissions: Permission[] = [];
  public previewImage = signal("" as string | null);

  private roleService = inject(RoleService);
  private PermissionService = inject(PermissionService);
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
          Validators.maxLength(25),
        ],
      ],
      permissions: [[]]
    });
   
    this.getPeromisions();
  }

  ngOnInit() {
    const roleId = this.route.snapshot.paramMap.get("id");
    if(roleId) {
      this.openMenu();
      this.getRole(roleId);
    }
  }

  getPeromisions() {
    this.PermissionService.getPermissions().subscribe((response) => {
      this.permissions = response;
    });
  }

  getRole(id: string | null) {
    if (!id) return;

    this.roleService.getById(id).subscribe((response) => {
      if (response.data && !(response.data instanceof Array)) {
        this.role = response.data.attribute as RoleAttribute;

        this.form.patchValue({
          id: this.role.id,
          name: this.role.name,
          permissions: this.role.permissions.map((permission: any) => permission.id),
          created: this.role.created,
          updated: this.role.updated,
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

    if (this.role && this.role.id && this.role.id.trim()) {
      this.update(data);
    } else {
      this.add(data);
    }
  }

  add(data: RoleAttribute) {
    this.roleService.create(data).subscribe((response) => {
      if (response.data && !(response.data instanceof Array)) {
        const item = response.data.attribute as RoleAttribute;
        this.router.navigate([`/admin/${this.roleService.entity}/edit/`, item.id]);
        this.notificationService?.success("Add role successful.");
        this.roleService.saveEvent.emit(true);
      }
    });
  }

  update(data: RoleAttribute) {
    if (!this.role.id) return;

    const differences = this.getDifferences(this.role, data);

    this.roleService.update(this.role.id, differences).subscribe((response) => {
      this.notificationService?.success("Update successful.");
      this.roleService.saveEvent.emit(true);
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
    this.menuCtrl.open(this.roleService.entity);
  }

  closeMenu() {
    this.menuCtrl.close(this.roleService.entity);
    this.router.navigate([`/admin/${this.roleService.entity}`]);
  }

  ngOnDestroy(): void {
    this.menuCtrl.close("roles");
  }
}
