import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: FormBuilder) {}

  getForm(name: string) {
    return window.forms[name];
  }
}
