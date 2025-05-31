import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'swithes-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './swithes-page.component.html',
})
export class SwithesPageComponent {
  private formBuilder = inject(FormBuilder);
  public formUtils = FormUtils;

  swithForm: FormGroup = this.formBuilder.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termAndConditions: [false, Validators.requiredTrue],
  });

  onSubmit() {
    console.log(this.swithForm.value);
    this.swithForm.markAllAsTouched();
  }
}
