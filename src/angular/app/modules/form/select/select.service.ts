import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageQuery, Paginated } from 'src/common/types/pagination.types';

@Injectable({
  providedIn: 'root',
})
export class SelectService {
  constructor(private http: HttpClient) {}

  getItem(url: string, value: string) {
    return this.http.get<unknown>(url + '/' + value);
  }

  getItems(url: string, page?: PageQuery) {
    return this.http.get<Paginated<unknown>>(url, { params: { ...page } });
  }
}
