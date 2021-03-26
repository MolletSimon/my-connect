import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpService: HttpClient, private _apiService: ApiService) { }

  login(mail, password): Observable<any>{
    return this._httpService.post(`${this._apiService.apiUrl}user/login`, {"mail": mail, "password": password});
  }
}
