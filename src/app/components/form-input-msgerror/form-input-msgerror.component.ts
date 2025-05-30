import { Component, Input, input } from '@angular/core';
import { FormUtils } from '../../utils/form.utils';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-input-msgerror',
  imports: [],
  templateUrl: './form-input-msgerror.component.html',
})
export class FormInputMsgerrorComponent {
  formUtils = FormUtils;

  //Opcion utilizando un @Input
  /* @Input() myForm!: FormGroup; */
  myForm = input.required<FormGroup>();
  controlName = input.required<string>();

  // Opcion utiliziando un gettee
  /*   get form(): FormGroup {
    return this.myForm();
  } */
}
