import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = 'http://localhost:3000/';
  public httpOptions = {
		headers: new HttpHeaders({
			'Authorization': `Bearer ${sessionStorage.getItem("CurrentUser") ? JSON.parse(sessionStorage.getItem("CurrentUser")).token : null}`
		})
	};
  constructor() { }
}
