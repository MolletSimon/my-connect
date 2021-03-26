import { GroupService } from './../services/group.service';
import { PostsComponent } from './posts/posts.component';
import { User } from './../model/user';
import { FeedService } from './../services/feed.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../model/group';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  user: User;
  groups: Group[];
  post: Subject<any> = new Subject();

  constructor(
    private _feedService: FeedService, 
    private _toastr: ToastrService, 
    private _groupService: GroupService
    ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getGroups();
  }

  savePost(f: NgForm) {
    this._feedService.publish(f.form.value["content"], this.user, f.form.value["group"] as Group)
      .subscribe(result => {
        this.post.next();
        f.form.reset();
        f.form.controls["group"].setValue("");
        this._toastr.info("Post publié !");
      })
  }

  getCurrentUser() {
    this.user = jwt_decode(sessionStorage.getItem("CurrentUser")) as User;
  }

  getGroups() {
    this._groupService.getGroups()
      .subscribe(groups => this.groups = groups)
  }

}
