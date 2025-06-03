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

  signUpForm = this.formBuilder.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
        [FormUtils.chekingServerResponse],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          FormUtils.notStrider,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(this.formUtils.passwordPattern),
        ],
      ],
      password2: ['', Validators.required],
    },
    {
      validators: [
        this.formUtils.isFieldOneEqualFieldTwo('password', 'password2'),
      ],
    }
  );

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    console.log(this.signUpForm.value);
    this.signUpForm.reset({});
  }
}
