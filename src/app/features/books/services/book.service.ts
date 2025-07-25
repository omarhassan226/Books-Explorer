import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IBook } from '../../../core/modals/book';
import { dev_environments } from '../../../../environment/environment';
import { apiUrls } from '../../../core/constants/api-urls';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(dev_environments.baseUrl + apiUrls.books);
  }

  createBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>(
      dev_environments.baseUrl + apiUrls.books,
      book
    );
  }

  updateBook(id: string, book: IBook): Observable<IBook> {
    return this.http.put<IBook>(
      `${dev_environments.baseUrl + apiUrls.books}/${id}`,
      book
    );
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete(
      `${dev_environments.baseUrl + apiUrls.books}/${id}`
    );
  }

  searchBooks(term: string) {
    return this.http.get<IBook[]>(
      `${
        dev_environments.baseUrl + apiUrls.books
      }/search?title=${encodeURIComponent(term)}`
    );
  }
}
