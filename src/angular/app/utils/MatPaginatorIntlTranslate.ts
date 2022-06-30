import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class MatPaginatorIntlTranslate extends MatPaginatorIntl {
  constructor(private translateService: TranslateService) {
    super();
    translateService
      .get([
        'PAGINATOR.FIRST_PAGE',
        'PAGINATOR.ITEM_PER_PAGE',
        'PAGINATOR.LAST_PAGE',
        'PAGINATOR.NEXT_PAGE',
        'PAGINATOR.PREVIOUS_PAGE',
      ])
      .subscribe((res) => this.update(res));
  }

  override getRangeLabel: (
    page: number,
    pageSize: number,
    length: number,
  ) => string = (page, pageSize, length) => {
    page++;
    let totalPage = Math.trunc(length / pageSize);
    if (totalPage * pageSize < length) {
      totalPage++;
    }
    return this.translateService.instant('PAGINATOR.RANGE', {
      page,
      pageSize,
      length,
      totalPage,
    });
  };

  private update(translate: { [key: string]: string }) {
    this.firstPageLabel = translate['PAGINATOR.FIRST_PAGE'];
    this.itemsPerPageLabel = translate['PAGINATOR.ITEM_PER_PAGE'];
    this.lastPageLabel = translate['PAGINATOR.LAST_PAGE'];
    this.nextPageLabel = translate['PAGINATOR.NEXT_PAGE'];
    this.previousPageLabel = translate['PAGINATOR.PREVIOUS_PAGE'];
    this.changes.next();
  }
}
