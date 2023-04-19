import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse, SearchResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private apiService: ApiService) {}

  getAllBooks(subjectName: string, pagination: any): Observable<BookResponse> {
    const limit = pagination?.pageSize || 10;
    const page = pagination?.pageIndex + 1 || 1;
    return this.apiService.get(`/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json?limit=${limit}&offset=${(page-1)*limit}`);
  }

  searchBooks(searchString: string, searchOption: string, pagination: any): Observable<SearchResponse> {
    const limit = pagination?.pageSize || 10;
    const page = pagination?.pageIndex + 1 || 1;
    return this.apiService.get(`/search.json?${searchOption}=${searchString.toLowerCase().split(' ').join('+')}&limit=${limit}&page=${page}`);
  }
}
