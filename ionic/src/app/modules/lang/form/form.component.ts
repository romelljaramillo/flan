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
import { LangService } from '../../lang/services/lang.service';
import { LangAttribute } from "@modules/lang/interfaces/lang.interface";
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
  public lang!: LangAttribute;
  public previewImage = signal("" as string | null);

  private langService = inject(LangService);
  protected router = inject(Router);
  private route = inject(ActivatedRoute);
  private menuCtrl = inject(MenuController);
  protected notificationService = inject(NotificationService);
  private fb = inject(FormBuilder);
  protected imageFile: File | null = null;

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
      iso_code: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
        ],
      ],
      language_code: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(5),
        ],
      ],
      date_format_lite: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
        ],
      ],
      date_format_full: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(32),
        ],
      ],
      is_rtl: [0],
      active: [0],
      image: [null],
    });
  }

  ngOnInit() {
    const langId = this.route.snapshot.paramMap.get("id");
    if(langId) {
      this.openMenu();
      this.getLang(langId);
    }
  }

  getLang(id: string | null) {
    if (!id) return;

    this.langService.getById(id).subscribe((response) => {
      if (response.data && !(response.data instanceof Array)) {
        this.lang = response.data.attribute as LangAttribute;
        this.previewImage.set(this.lang.image);

        this.form.patchValue({
          id: this.lang.id,
          name: this.lang.name,
          image: this.lang.image,
          iso_code: this.lang.iso_code,
          language_code: this.lang.language_code,
          date_format_lite: this.lang.date_format_lite,
          date_format_full: this.lang.date_format_full,
          is_rtl: this.lang.is_rtl,
          active: this.lang.active,
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

    if (this.lang && this.lang.id && this.lang.id.trim()) {
      this.update(data);
    } else {
      this.add(data);
    }
  }

  add(data: LangAttribute) {
    this.langService.create(data).subscribe((response) => {
      if (response.data && !(response.data instanceof Array)) {
        const item = response.data.attribute as LangAttribute;
        this.router.navigate([`/admin/${this.langService.entity}/edit/`, item.id]);
        this.notificationService?.success("Add role successful.");
        this.langService.saveEvent.emit(true);
      }
    });
  }

  update(data: LangAttribute) {
    if (!this.lang.id) return;

    const differences = this.getDifferences(this.lang, data);

    this.langService.update(this.lang.id, differences).subscribe((response) => {
      this.notificationService?.success("Update successful.");
      this.langService.saveEvent.emit(true);
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
    this.menuCtrl.open(this.langService.entity);
  }

  closeMenu() {
    this.menuCtrl.close(this.langService.entity);
    this.router.navigate([`/admin/${this.langService.entity}`]);
  }

  ngOnDestroy(): void {
    this.menuCtrl.close("langs");
  }

  onImageChange(file: File | Event) {
    if (file instanceof File) {
      this.imageFile = file;
    } else {
      const fileUpload = file.target as HTMLInputElement;
      if (fileUpload.files && fileUpload.files.length > 0) {
        this.imageFile = fileUpload.files[0];
      }
    }

    if (!this.imageFile) {
      this.previewImage.set(null);
      return;
    }

    this.form.patchValue({ image: this.imageFile });

    if (this.form.get("image")) {
      this.form.get("image")!.updateValueAndValidity();
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.imageFile);

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
      this.onImageChange(files[0]);
    }
  }

  deleteImage() {
    this.previewImage.set(null);
    this.form.patchValue({ image: null });
  }
}
