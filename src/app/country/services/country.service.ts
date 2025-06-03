import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private baseUser = 'https://restcountries.com/v3.1';
  /* /region/americas?fields=name,cca3,borders */
  private http = inject(HttpClient);
  private _regions = [
    'Africa',
    'Americas',
    'Arctic',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    console.log({ region });
    const url: string = `${this.baseUser}/region/${region}?fields=name,cca3,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alpaCod: string): Observable<Country> {
    const url: string = `${this.baseUser}/alpha/${alpaCod}?fields=name,cca3,borders`;
    return this.http.get<Country>(url);
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if (!countryCodes || countryCodes.length === 0) return of([]);
    const countriesRequest: Observable<Country>[] = [];
    countryCodes.forEach((code) => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequest.push(request);
    });
    return combineLatest(countriesRequest);
  }
}
