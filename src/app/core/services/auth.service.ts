import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environment/environment';
import { apiUrls } from '../constants/api-urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(body: any) {
    console.log(`${environments.login}${apiUrls.login}`);

    return this.http.post(`${environments.login}${apiUrls.login}`, body, {
      headers: {
        'x-api-key': 'reqres-free-v1',
      },
    });
  }
}
