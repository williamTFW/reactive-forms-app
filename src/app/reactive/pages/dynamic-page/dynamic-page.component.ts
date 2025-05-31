import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
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

  newFavoGame = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onAddFavorites() {
    if (this.newFavoGame.invalid) return;
    const newGame = this.newFavoGame.value;

    this.favoriteGames.push(
      this.formBuilder.control(newGame, [
        Validators.required,
        Validators.minLength(3),
      ])
    );
    this.newFavoGame.reset();
  }

  onDeleteFavGame(index: number) {
    this.favoriteGames.removeAt(index);
  }

  onSubmit() {
    console.log(this.myForm);
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }
}
