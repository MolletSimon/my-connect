import { Appointment } from './../model/appointment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../model/group';

@Injectable({
	providedIn: 'root'
})
export class AppointmentService {

	constructor(
		private _apiService: ApiService,
		private _httpClient: HttpClient
	) { }

	getAppointments(groups: Group[]): Observable<Appointment[]> {
		return this._httpClient.post<Appointment[]>(`${this._apiService.apiUrl}appointment/getAll`, {groups}, this._apiService.httpOptions);
	}

	deleteAppointments(id: string): Observable<any> {
		return this._httpClient.delete<any>(`${this._apiService.apiUrl}appointment/${id}`, this._apiService.httpOptions);
	}

	addAppointments(app: Appointment): Observable<Appointment> {
		return this._httpClient.post<Appointment>(`${this._apiService.apiUrl}appointment/add`, app, this._apiService.httpOptions);
	}
}
