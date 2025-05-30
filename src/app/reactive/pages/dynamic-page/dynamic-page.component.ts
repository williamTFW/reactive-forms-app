import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';
import { FormInputMsgerrorComponent } from '../../../components/form-input-msgerror/form-input-msgerror.component';

@Component({
  selector: 'dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule, FormInputMsgerrorComponent],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private formBuilder = inject(FormBuilder);
  public formUtils = FormUtils;

  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array(
      [
        ['metal gear', [Validators.required, Validators.minLength(3)]],
        ['death stranding', [Validators.required, Validators.minLength(3)]],
      ],
      [Validators.minLength(3)]
    ),
  });

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }
}
