import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../../environment/environment';
import { apiUrls } from '../../../core/constants/api-urls';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks() {
    console.log(environments.CRUD + apiUrls.books);

    return this.http.get(
      // 'https://crudcrud.com/api/9a340690f6894327af6c9dbb00caf6d7/books'
      environments.CRUD + apiUrls.books
    );
  }
}
