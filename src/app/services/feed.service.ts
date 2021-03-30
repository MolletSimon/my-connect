import { Group } from './../model/group';
import { User } from './../model/user';
import { Post } from './../model/post';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private _httpService: HttpClient, private _apiService: ApiService) { }

  getPosts(): Observable<Post[]> {
    console.log(this._apiService.httpOptions)
    return this._httpService.get<Post[]>(`${this._apiService.apiUrl}post/get`, this._apiService.httpOptions)
  }

  publish(content, user: User, groups: Group[]): Observable<Post> {
    let group = [];
    groups.forEach(g => {
      group.push({
        "id": g._id,
        "name": g.name,
        "color": g.color
      })
    });

    return this._httpService.post<Post>(`${this._apiService.apiUrl}post/publish`, 
      {
        "content": content, 
        "date": Date.now(), 
        "user": {
          "lastname": user.lastname,
          "firstname": user.firstname,
          "id": user.id
        },
        "group": group
      }, this._apiService.httpOptions
      )
  }
}
