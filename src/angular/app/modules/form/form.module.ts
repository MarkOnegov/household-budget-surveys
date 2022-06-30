import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { FormDialogComponent } from './form-dialog.component';
import { FormComponent } from './form.component';
import { SelectDialogComponent } from './select/select-dialog/select-dialog.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    FormComponent,
    FormDialogComponent,
    SelectComponent,
    SelectDialogComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMaskModule,
    MatButtonModule,
    MatDatepickerModule,
  ],
  exports: [FormComponent, FormDialogComponent],
})
export class FormModule {}
