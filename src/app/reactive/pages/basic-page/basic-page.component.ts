import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';
import { FormInputMsgerrorComponent } from '../../../components/form-input-msgerror/form-input-msgerror.component';

@Component({
  selector: 'basic-page',
  imports: [JsonPipe, ReactiveFormsModule, FormInputMsgerrorComponent],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  formItuls = FormUtils;

  // Opcion mas tediosa para crear formualrios Reacativos
  myForm2 = new FormGroup({
    name: new FormControl<string | null>(''),
    // Cada propiedad tiene un valor (primer parametro), valdiaciones sincronaz (segundo parametro), validaciones Asincronza (tercer paramtro), por lo general las validaciones van en arreglos [].
    price: new FormControl<number | null>(0, [], []),
    inStorage: new FormControl<number | null>(0),
  });

  private formBuilder = inject(FormBuilder);
  myForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  /*   isValidField(fieldName: string): boolean | null {
    return (
      this.myForm.controls[fieldName].errors &&
      this.myForm.controls[fieldName].touched
    );
  } */

  /* getFieldErro(fieldName: string): string | null {
    if (!this.myForm.controls[fieldName]) return null;
    const errors = this.myForm.controls[fieldName].errors ?? {};
    for (let key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido !!';
        case 'minlength':
          return `Se requieren Mínimo ${errors['minlength'].requiredLength} caracteres !`;
        case 'min':
          return `El valor minimo es de: ${errors['min'].min}`;
      }
    }
    return null;
  } */

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
