import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { filter, Subscribable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private fb = inject(FormBuilder);
  private countryService = inject(CountryService);
  regions = signal(this.countryService.regions);
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  countryForm = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  });

  onFormChanged = effect((onCleanUp) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();
    onCleanUp(() => {
      regionSubscription?.unsubscribe();
      countrySubscription?.unsubscribe();
      console.log('Cerrado Subscription');
    });
  });

  onRegionChanged() {
    return this.countryForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => this.countryForm.get('country')?.setValue('')),
        tap(() => this.countryForm.get('border')?.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? '')
        )
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChanged() {
    return this.countryForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => this.countryForm.get('border')?.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((alphaCode) => {
          console.log(alphaCode);
          return this.countryService.getCountryByAlphaCode(alphaCode ?? '');
        }),
        switchMap((country) => {
          console.log(country);
          return this.countryService.getCountryNamesByCodeArray(
            country.borders
          );
        })
      )
      .subscribe((borders) => {
        console.log(borders);
        this.borders.set(borders);
      });
  }
}
