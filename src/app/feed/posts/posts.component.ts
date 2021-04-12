import { Post } from './../../model/post';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FeedService } from 'src/app/services/feed.service';
import { Subject } from 'rxjs';
import { Group } from 'src/app/model/group';
import { Poll } from 'src/app/model/poll';
import { User } from 'src/app/model/user';
declare var $: any;

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
  @Input() user: User;
  poll: Poll;
  xAxisLabel = "Réponses";
  yAxisLabel = "Votants";
  view: any[] = [700, 400];
  yAxisTicks = [1, 2, 3, 4, 5];
  colorScheme = {
    domain: ['#54428E', '#8963BA', '#AFE3C0', '#90C290', '#688B58']
  };
  
  constructor(private _feedService: FeedService) { }

  ngOnInit(): void {
    this.viewMobile();
    this.getPosts();
    this.post.subscribe(() => {
      this.getPosts();
    })
  }

  getPosts() {
    this._feedService.getPosts(this.user).subscribe(result => {
      this.posts = result
      this.checkIfPined();
      this.checkIfUserVoted();
      this.preparePoll();
      this.postsDisplayed = this.posts;
    });
  }

  viewMobile() {
    if (window.matchMedia("(max-width: 600px)").matches) {
      this.view = [300, 300];
    }
  }

  checkIfPined() {
    this.posts.forEach(post => {
      if(post.isPined) {
        this.posts = this.posts.filter(p => p._id != post._id);
        this.posts.unshift(post);
      }
    });
    console.log(this.posts)
  }

  preparePoll() {
    this.posts.forEach(post => {
      if(post.isPoll) {
        if (post.poll.hasVoted) {
          post.poll.data = [];
          post.poll.answers.forEach(answer => {
            post.poll.data.push({name: answer.name, value: answer.nbVote, extra: {id: answer.id}})
          })
        }
      }
    })
  }

  checkIfUserVoted() {
    this.posts.forEach(post => {
      if(post.isPoll) {
        post.poll.answers.forEach(answer => {
          answer.usersWhoVoted.forEach(user => {
            if (user._id === this.user._id) {
              post.poll.hasVoted = true;
            }
          })
        })
      }
    })
  }

  filterByGroup(group, event) {
    if (group === 'tous') {
      this.postsDisplayed = this.posts;
    } else {
      this.postsDisplayed = this.posts.filter(p => p.group.some(g => g._id === group._id));
    }
  } 

  onSelect(event) {
  }

  vote(post: Post) {
    this.poll = post.poll;
    this.poll.answers.forEach(a => {
      for (let i = 0; i < $("#votes").val().length; i++) {
        let value = $("#votes").val()[i];
        if (a.id == value) {
          a.nbVote++;
          a.usersWhoVoted.push(this.user)
        }
      }
    });
    this._feedService.vote(this.poll, post._id)
      .subscribe(() => {
        this.post.next();
      })
  }

  pinPost(post: Post) {
    post.isPined = true;
    this._feedService.pin(post)
      .subscribe(() => {
        this.getPosts();
      })
  }

  unpinPost(post: Post) {
    post.isPined = false;
    this._feedService.pin(post)
      .subscribe(() => {
        this.getPosts();
      })
  }

  // CSS FUNCTION
  addAlpha(color: string, opacity: number): string {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

}
