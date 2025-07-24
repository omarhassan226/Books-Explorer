import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {}

   login(body:any){
    return this.http.post(environments.login, body)
   }


}
