import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public apiUrl = 'https://api-my-connect.herokuapp.com/';
  public httpOptions = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${
        localStorage.getItem('CurrentUser')
          ? JSON.parse(localStorage.getItem('CurrentUser')).token
          : null
      }`,
    }),
  };
  constructor() {}
}
