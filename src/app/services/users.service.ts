import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	constructor(
		private _apiService: ApiService,
		private _httpClient: HttpClient
	) { }

	getUsers(): Observable<User[]> {
		return this._httpClient.get<User[]>(`${this._apiService.apiUrl}user/getAll`, this._apiService.httpOptions);
	}

	addUser(value): Observable<User> {
		let user = {
			"active": true,
			"firstname": value.firstname,
			"lastname": value.lastname,
			"isSuperadmin": value.isSuperadmin == "" ? false : true,
			"mail": value.mail,
			"phone": value.phone,
			"groups": [],
			"password": "temporaire"
		}
		return this._httpClient.post<User>(`${this._apiService.apiUrl}user/add`, user, this._apiService.httpOptions);
	}

	deleteUser(id: string): Observable<any> {
		return this._httpClient.delete<any>(`${this._apiService.apiUrl}user/delete/${id}`, this._apiService.httpOptions);
	}
}
