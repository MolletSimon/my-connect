import { Post } from './../../model/post';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts: Post[];
  @Input() post: Subject<any>;

  constructor(private _feedService: FeedService) { }

  ngOnInit(): void {
    this.getPosts();

    this.post.subscribe(() => {
      this.getPosts();
    })
  }

  getPosts() {
    this._feedService.getPosts().subscribe(result => this.posts = result);
  }

}
