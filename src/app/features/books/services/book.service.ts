import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { BooksModule } from '../books.module';
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

  getBookById(id: string): Observable<BooksModule> {
    return this.http.get<IBook>(
      `${dev_environments.baseUrl + apiUrls.books}/${id}`
    );
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
}
