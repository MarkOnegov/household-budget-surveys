import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paginate } from 'src/common/types/pagination.types';
import { User } from 'src/common/types/user.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(pageIndex: number, pageSize: number) {
    return this.http.get<Paginate<User>>('/api/user', {
      params: { pageIndex, pageSize },
    });
  }
}
