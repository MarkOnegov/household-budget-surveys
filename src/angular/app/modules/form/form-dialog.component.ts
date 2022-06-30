import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export type FormDialogData = {
  title: string;
  submitButton: string;
  cancelButton: string;
  form: string;
  urlValues?: { [name: string]: string };
};

@Component({
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
})
export class FormDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) protected data: FormDialogData) {}
}
