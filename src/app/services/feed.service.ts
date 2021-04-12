import { Poll } from './../model/poll';
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

  getPosts(user: User): Observable<Post[]> {
    let body = {
      "ids": [],
      "isSuperadmin": user.isSuperadmin
    };
    user.groups.forEach(group => {
      body.ids.push(group._id);
    })
    return this._httpService.post<Post[]>(`${this._apiService.apiUrl}post/get`, body, this._apiService.httpOptions)
  }

  publish(content, user: User, groups: Group[], poll?: Poll, isPoll?): Observable<Post> {
    let group = [];
    groups.forEach(g => {
      group.push({
        "_id": g._id,
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
          "id": user._id
        },
        "group": group,
        "isPined": false,
        "isPoll": isPoll ? isPoll : false,
        "poll": poll ? poll : {}
      }, this._apiService.httpOptions
      )
  }

  vote(poll: Poll, id: string): Observable<any> {
    return this._httpService.put<any>(`${this._apiService.apiUrl}post/update/${id}`, 
      {
        "poll": poll
      }, this._apiService.httpOptions
      )
  }

  pin(post: Post): Observable<any> {
    return this._httpService.put<any>(`${this._apiService.apiUrl}post/update/${post._id}`, 
      {
        "isPined": post.isPined
      }, this._apiService.httpOptions
      )
  }
}
