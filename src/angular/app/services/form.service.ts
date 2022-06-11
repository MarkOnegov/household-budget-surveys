import { Injectable } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private fb: UntypedFormBuilder) {}

  getForm(name: string) {
    return window.forms[name];
  }
}
