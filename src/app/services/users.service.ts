import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Group } from '../model/group';

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

	uploadPicture(url, user): Observable<any> {
		let body = {
			"id": user._id,
			"data": url
		};
		return this._httpClient.put<any>(`${this._apiService.apiUrl}user/upload/picture`, body, this._apiService.httpOptions)
	}

	getPicture(user: User) : Observable<any> {
		return this._httpClient.get<any>(`${this._apiService.apiUrl}user/get/picture/${user._id}`, this._apiService.httpOptions)
	}

	addGroupToUser(id: string, groups: Group[]): Observable<any> {
		let body = {
			"groups": groups
		};
		return this._httpClient.put<any>(`${this._apiService.apiUrl}user/addGroup/${id}`, body ,this._apiService.httpOptions)
	}

	updateUser(user: User): Observable<any> {
		return this._httpClient.put<any>(`${this._apiService.apiUrl}user/update/${user._id}`, user ,this._apiService.httpOptions)
	}

	getMails(): Observable<User[]> {
		return this._httpClient.get<User[]>(`${this._apiService.apiUrl}user/get/mails`, this._apiService.httpOptions);
	}
}
