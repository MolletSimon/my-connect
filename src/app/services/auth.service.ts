import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpService: HttpClient, private _apiService: ApiService) { }

  login(mail, password): Observable<any>{
    return this._httpService.post(`${this._apiService.apiUrl}user/login`, {"mail": mail, "password": password});
  }

  updatePassword(password: String, id: string): Observable<User> {
    return this._httpService.put<User>(`${this._apiService.apiUrl}user/updatePassword/${id}`, {
      "password": password
    }, this._apiService.httpOptions)
  }

  signUp(user: User): Observable<any> {
    return this._httpService.post<any>(`${this._apiService.apiUrl}user/signup`, user, this._apiService.httpOptions)
  }
}
