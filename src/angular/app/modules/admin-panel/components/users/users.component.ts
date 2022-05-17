import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { ResizeService } from 'src/angular/app/services/resize.service';
import { Role, User } from 'src/common/types/user.types';
import { UsersService } from './users.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  displayedColumns = ['name', 'email', 'roles'];
  dataSource = new Subject<User[]>();

  roleNames: { [id: string]: string } = {};

  length = 0;
  pageSizeOptions = [10, 25, 50];
  pageSize = 10;
  pageIndex = 0;

  isSmallScreen = false;

  constructor(
    private usersService: UsersService,
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

  getName({ username, firstName, secondName, lastName }: User) {
    if (!firstName && !secondName && !lastName) {
      return username;
    }
    let name = '';
    if (firstName) {
      name += firstName + ' ';
    }
    if (secondName) {
      name += secondName + ' ';
    }
    if (lastName) {
      name += lastName + ' ';
    }
    return name + `(${username})`;
  }

  getRoles(user: User) {
    return user.roles
      .sort()
      .map((role) => this.roleNames[role])
      .join(', ');
  }

  private updateList(pageIndex: number, pageSize: number) {
    this.usersService
      .getUsers(pageIndex, pageSize)
      .subscribe(({ data, pagination }) => {
        this.dataSource.next(data);
        this.length = pagination.length;
        this.pageSize = pagination.pageSize;
        this.pageIndex = pagination.pageIndex;
      });
  }
}
