import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { HouseholdsService } from 'src/angular/app/services/households.service';
import { ResizeService } from 'src/angular/app/services/resize.service';
import { Household } from 'src/common/types/household.types';
import { Role } from 'src/common/types/user.types';

@Component({
  templateUrl: './households.component.html',
  styleUrls: ['./households.component.scss'],
})
export class HouseholdsComponent {
  displayedColumns = ['territory', 'locality', 'description', 'menu'];
  dataSource = new Subject<Household[]>();

  roleNames: { [id: string]: string } = {};

  length = 0;
  pageSizeOptions = [10, 25, 50];
  pageSize = 10;
  pageIndex = 0;

  isSmallScreen = false;

  constructor(
    private householdsService: HouseholdsService,
    translate: TranslateService,
    public resizeService: ResizeService,
  ) {
    resizeService.innerWidth$.subscribe(
      (width) => (this.isSmallScreen = width < 1000),
    );
    translate
      .get(Object.values(Role).map((role) => 'ROLE.' + role))
      .subscribe((values) => {
        this.roleNames = {};
        Object.entries(values).forEach(
          ([role, name]) => (this.roleNames[role.substring(5)] = name + ''),
        );
      });
    this.updateList(0, this.pageSize);
  }

  pageChanged({ pageIndex, pageSize }: PageEvent) {
    this.updateList(pageIndex, pageSize);
  }

  export(id: string) {
    this.householdsService.export(id);
  }

  log<T>(data: T): T {
    console.log(data);
    return data;
  }

  private updateList(pageIndex: number, pageSize: number) {
    this.householdsService
      .getHouseholds(pageIndex, pageSize)
      .subscribe(({ data, pagination }) => {
        this.dataSource.next(data);
        this.length = pagination.total;
        this.pageSize = pageSize;
        this.pageIndex = pagination.page;
      });
  }
}
