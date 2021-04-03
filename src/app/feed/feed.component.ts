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
  groupsSelected: Group[] = [];
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
    if (this.groupsSelected.length > 0) {
      this.groupsSelected;
    } else {
      this.groupsSelected.push(f.form.value["group"] as Group)
    }
    this._feedService.publish(f.form.value["content"], this.user, this.groupsSelected)
      .subscribe(result => {
        this.post.next();
        f.form.reset();
        this.groupsSelected = [];
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

  addGroup(group: Group) {
    this.groupsSelected.push(group);
  }

  removeGroup(group: Group) {
    this.groupsSelected = this.groupsSelected.filter(g => g._id != group._id);
  }

  addAlpha(color: string, opacity: number): string {
      // coerce values so ti is between 0 and 1.
      const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
      return color + _opacity.toString(16).toUpperCase();
  }
}
