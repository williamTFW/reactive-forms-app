import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
}

export class FormUtils {
  public static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  public static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  public static passwordPattern = '^[a-zA-Z0-9]{6,}$';

  public static getTextError(errors: ValidationErrors) {
    for (let key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido !!';
        case 'minlength':
          return `Se requieren Mínimo ${errors['minlength'].requiredLength} caracteres !`;
        case 'min':
          return `El valor minimo es de: ${errors['min'].min}`;
        case 'email':
          return `El valor ingresado no es un correo Valido`;
        case 'emailTaken':
          return 'El email se enceuntra en uso !!';
        case 'noStrider':
          return 'No se puede utilizar el username: strider!!';
        case 'pattern':
          /*  console.log(errors);
          console.log(typeof errors['pattern']);
          console.log(typeof errors['pattern'].requiredPattern); */

          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            `No es un Email valido !!`;
          }
          return 'Error de pattern';

        default:
          return `Error, los datos ingresados no son validos !!`;
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

  public static isValidFieldFormControl(field: FormControl): boolean | null {
    return !!field.errors && field.touched;
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

  public static getFieldErrorFormControl(field: FormControl): string | null {
    if (!field) return null;
    const errors = field.errors ?? {};
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

  public static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Val = formGroup.get(field1)?.value;
      const field2Val = formGroup.get(field2)?.value;

      return field1Val === field2Val ? null : { passwordsNotEquals: true };
    };
  }

  static async chekingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    console.log('Validando al servidor');
    await sleep();
    const formValue = control.value;
    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true,
      };
    }

    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value === 'strider' ? { noStrider: true } : null;
  }
}
