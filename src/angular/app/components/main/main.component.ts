import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { filter, Subject, take } from 'rxjs';
import { Household } from 'src/common/types/household.types';
import { AuthService } from '../../services/auth.service';
import { HouseholdsService } from '../../services/households.service';
import { ResizeService } from '../../services/resize.service';

@Component({
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  displayedColumns = ['territory', 'locality', 'description'];
  dataSource = new Subject<Household[]>();

  length = 0;
  pageSizeOptions = [10, 25, 50];
  pageSize = 10;
  pageIndex = 0;

  isSmallScreen = false;

  constructor(
    private householdsService: HouseholdsService,
    public resizeService: ResizeService,
    private authService: AuthService,
  ) {
    resizeService.innerWidth$.subscribe(
      (width) => (this.isSmallScreen = width < 1000),
    );
    this.updateList(0, this.pageSize);
  }

  pageChanged({ pageIndex, pageSize }: PageEvent) {
    this.updateList(pageIndex, pageSize);
  }

  log<T>(data: T): T {
    console.log(data);
    return data;
  }

  private updateList(pageIndex: number, pageSize: number) {
    this.authService.currentUser
      .pipe(
        filter((user) => !!user),
        take(1),
      )
      .subscribe((user) =>
        this.householdsService
          .getHouseholds(pageIndex, pageSize, user?.username)
          .subscribe(({ data, pagination }) => {
            this.dataSource.next(data);
            this.length = pagination.total;
            this.pageSize = pageSize;
            this.pageIndex = pagination.page;
          }),
      );
  }
}
