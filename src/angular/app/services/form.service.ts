import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Values = { [name: string]: unknown };

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private http: HttpClient) {}

  getFormValues(url: string) {
    return this.http.get<Values>(url);
  }

  create(url: string, value: { [name: string]: unknown }) {
    return this.http.post(url, value);
  }

  update(url: string, value: { [name: string]: unknown }) {
    return this.http.put(url, value);
  }
}
