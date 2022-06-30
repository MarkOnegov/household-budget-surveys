import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Household, HouseholdProgress } from 'src/common/types/household.types';
import { Paginated } from 'src/common/types/pagination.types';

@Injectable({
  providedIn: 'root',
})
export class HouseholdsService {
  constructor(private http: HttpClient) {}

  getHouseholds(pageIndex: number, pageSize: number, interviewer?: string) {
    const params: { [name: string]: string | number } = {
      length: pageSize,
      page: pageIndex,
    };
    if (interviewer) {
      params['interviewer'] = interviewer;
    }
    return this.http.get<Paginated<Household>>('/api/household', {
      params: params,
    });
  }

  getHouseholdFormValue(id: string, form: string) {
    return this.http.get(`/api/household/${id}/form/${form}`);
  }

  getProgress(id: string) {
    return this.http.get<HouseholdProgress>(`/api/household/${id}/form`);
  }

  export(id: string) {
    this.http
      .get('/api/household/' + id, { responseType: 'blob' as 'json' })
      .subscribe((response: any) => {
        const type = response.type;
        const data = [];
        data.push(response);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(
          new Blob(data as BlobPart[], { type }),
        );
        link.setAttribute('download', id + '.json');
        document.body.appendChild(link);
        link.click();
      });
  }
}
