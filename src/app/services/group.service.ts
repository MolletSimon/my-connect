import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Group } from '../model/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private _httpService: HttpClient, private _apiService: ApiService) { }

  getGroups(): Observable<Group[]> {
    return this._httpService.get<Group[]>(`${this._apiService.apiUrl}group/getAll`, this._apiService.httpOptions);
  }

  deleteGroup(id: string): Observable<any> {
    return this._httpService.delete<any>(`${this._apiService.apiUrl}group/${id}`, this._apiService.httpOptions);
  }

  addGroup(form: any): Observable<any> {
    let body = {
      "name": form.groupName,
      "color": form.color,
      "responsable": {
        "lastname": form.responsableName,
        "firstname": form.responsableFirstname,
        "phone": form.responsablePhone
      }
    };

    return this._httpService.post(`${this._apiService.apiUrl}group/add`, body, this._apiService.httpOptions);
  }
}
