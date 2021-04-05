import { Post } from './../../model/post';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { Subject } from 'rxjs';
import { Group } from 'src/app/model/group';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts: Post[];
  public postsDisplayed: Post[];
  @Input() post: Subject<any>;
  @Input() groups: Group[];
  
  constructor(private _feedService: FeedService) { }

  ngOnInit(): void {
    this.getPosts();

    this.post.subscribe(() => {
      this.getPosts();
    })
  }

  getPosts() {
    this._feedService.getPosts().subscribe(result => {
      this.posts = result
      this.postsDisplayed = result;
    });
  }

  filterByGroup(group, event) {
    if (group === 'tous') {
      this.postsDisplayed = this.posts;
    } else {
      this.postsDisplayed = this.posts.filter(p => p.group.some(g => g._id === group._id));
    }
  } 

  // CSS FUNCTION
  addAlpha(color: string, opacity: number): string {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

}
