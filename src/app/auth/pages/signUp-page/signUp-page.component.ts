import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';
import { FormInputMsgerrorComponent } from '../../../components/form-input-msgerror/form-input-msgerror.component';

@Component({
  selector: 'sign-up-page',
  imports: [JsonPipe, ReactiveFormsModule, FormInputMsgerrorComponent],
  templateUrl: './signUp-page.component.html',
})
export class SignUpPageComponent {
  private formBuilder = inject(FormBuilder);
  public formUtils = FormUtils;

  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    userName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    password2: ['', Validators.required],
  });

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    console.log(this.signUpForm.value);
    this.signUpForm.reset({});
  }
}
