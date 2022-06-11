import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paginated } from 'src/common/types/pagination.types';
import { User } from 'src/common/types/user.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(pageIndex: number, pageSize: number) {
    return this.http.get<Paginated<User>>('/api/user', {
      params: { length: pageSize, page: pageIndex },
    });
  }

  getUser(username: string) {
    return this.http.get<User>('/api/user/' + username);
  }
}
