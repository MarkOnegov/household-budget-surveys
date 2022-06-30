import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectFieldOptions } from 'src/common/decorators/form.decorators';
import { FormBase } from '../form.base';
import { FieldAdd } from '../form.component';
import { SelectDialogComponent } from './select-dialog/select-dialog.component';
import { SelectService } from './select.service';

@Component({
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  selector: 'hbs-select',
})
export class SelectComponent extends FormBase {
  @Input('field')
  set fieldData(value: SelectFieldOptions & FieldAdd & { i18nName?: string }) {
    this.field = value;
    value.control.valueChanges.subscribe((selected) => {
      if (!selected) {
        this.selectedItem = undefined;
        return;
      }
      if (
        this.selectedItem &&
        this.field.getValue(this.selectedItem) === selected
      ) {
        return;
      }
      this.selectService
        .getItem(this.field.url, selected + '')
        .subscribe((item) => {
          this.selectedItem = item;
          if (item) {
            this.field.control.setValue(selected);
          } else {
            this.field.control.setValue(undefined);
          }
        });
    });
  }
  field!: SelectFieldOptions & FieldAdd & { i18nName?: string };

  selectedItem: unknown;

  constructor(private selectService: SelectService, private dialog: MatDialog) {
    super();
  }

  openDialog() {
    this.dialog
      .open(SelectDialogComponent, {
        data: {
          ...this.field,
          value: this.selectedItem && this.field.getValue(this.selectedItem),
        },
      })
      .afterClosed()
      .subscribe((selected) => {
        if (selected) {
          this.field.control.setValue(selected[0].value);
        }
      });
  }
}
