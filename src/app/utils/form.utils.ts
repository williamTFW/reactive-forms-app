import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  public static getTextError(errors: ValidationErrors) {
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
  }

  public static isValidField(
    form: FormGroup,
    fieldName: string
  ): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  public static isValidFieldInArray(
    formArray: FormArray,
    index: number
  ): boolean | null {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  public static getFieldErro(
    form: FormGroup,
    fieldName: string
  ): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    return this.getTextError(errors);
  }

  public static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;
    const errors = formArray.controls[index].errors ?? {};
    return this.getTextError(errors);
  }
}
