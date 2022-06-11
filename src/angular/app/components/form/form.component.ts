import { Component, Input } from '@angular/core';

@Component({
  selector: 'hbs-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  @Input('formName')
  set formName(form: string) {}
}
