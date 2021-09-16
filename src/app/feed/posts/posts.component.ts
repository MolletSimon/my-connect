import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from './../../services/users.service';
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
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts: Post[];
  public postsDisplayed: Post[];
  public postModal: Post;
  @Input() post: Subject<any>;
  @Input() groups: Group[];
  @Input() user: User;
  poll: Poll;
  postToDelete: Post;
  users: User[];
  xAxisLabel = 'Réponses';
  yAxisLabel = 'Votants';
  view: any[] = [700, 400];
  yAxisTicks = [1, 2, 3, 4, 5];
  colorScheme = {
    domain: ['#54428E', '#8963BA', '#AFE3C0', '#90C290', '#688B58'],
  };

  constructor(
    private _feedService: FeedService,
    private _usersService: UsersService,
    private _domSanitizer: DomSanitizer,
    private _toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    this.viewMobile();
    this.getPosts();
    this.post.subscribe(() => {
      this.getPosts();
    });
  }

  getPosts() {
    this._feedService.getPosts(this.user).subscribe((result) => {
      this.posts = result;
      this.checkIfPined();
      this.checkIfUserVoted();
      this.checkIfUserLiked();
      this.preparePoll();
      this.postsDisplayed = this.posts;
      this.postsDisplayed.forEach((post) => {
        post['user-post'] = false;
        if (post.user.id == this.user._id) {
          post['user-post'] = true;
        }
      });
      this.getUsers();
    });
  }

  getUsers() {
    this.postsDisplayed.forEach((post) => {
      this.getPicture(post.user);
    });
  }

  getPicture(user) {
    if (user.id) {
      user._id = user.id;
      this._usersService.getPicture(user).subscribe((picture) => {
        if (picture[0].img) {
          user.img = this._domSanitizer.bypassSecurityTrustResourceUrl(
            `data:image/png;base64, ${picture[0].img}`
          );
        }
      });
    }
  }

  viewMobile() {
    if (window.matchMedia('(max-width: 600px)').matches) {
      this.view = [300, 300];
    }
  }

  checkIfPined() {
    this.posts.forEach((post) => {
      if (post.isPined) {
        this.posts = this.posts.filter((p) => p._id != post._id);
        this.posts.unshift(post);
      }
    });
  }

  preparePoll() {
    this.posts.forEach((post) => {
      if (post.isPoll) {
        if (post.poll.hasVoted) {
          post.poll.data = [];
          post.poll.answers.forEach((answer) => {
            post.poll.data.push({
              name: answer.name,
              value: answer.nbVote,
              extra: { id: answer.id },
            });
          });
        }
      }
    });
  }

  checkIfUserVoted() {
    this.posts.forEach((post) => {
      if (post.isPoll) {
        post.poll.answers.forEach((answer) => {
          answer.usersWhoVoted.forEach((user) => {
            if (user._id === this.user._id) {
              post.poll.hasVoted = true;
            }
          });
        });
      }
    });
  }

  filterByGroup(group, event) {
    if (group === 'tous') {
      this.postsDisplayed = this.posts;
    } else {
      this.postsDisplayed = this.posts.filter((p) =>
        p.group.some((g) => g._id === group._id)
      );
    }
  }

  onSelect(event) {}

  vote(post: Post) {
    this.poll = post.poll;
    this.poll.answers.forEach((a) => {
      for (let i = 0; i < $('#votes').val().length; i++) {
        let value = $('#votes').val()[i];
        if (a.id == value) {
          a.nbVote++;
          a.usersWhoVoted.push(this.user);
        }
      }
    });
    this._feedService.vote(this.poll, post._id).subscribe(() => {
      this.post.next();
    });
  }

  pinPost(post: Post) {
    post.isPined = true;
    this._feedService.pin(post).subscribe(() => {
      this.getPosts();
    });
  }

  like(post: Post) {
    if (post.userLiked) {
      this.unlike(post);
      return;
    }

    post.liked.push({
      _id: this.user._id,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
    });
    this._feedService.like(post).subscribe(() => {
      this.getPosts();
    });
  }

  unlike(post: Post) {
    post.liked = post.liked.filter((u) => u._id != this.user._id);
    this._feedService.like(post).subscribe(() => {
      this.getPosts();
    });
  }

  deletePost() {
    if (this.postToDelete) {
      this._feedService.removePost(this.postToDelete).subscribe(() => {
        this._toastr.error('Post supprimé !');
        this.getPosts();
        this.postToDelete = {} as Post;
      });
    }
  }

  whoLiked(id: string, post: Post) {
    this.postModal = post;
    this.openModal(id);
  }

  openModal(id: string, prop?) {
    document.getElementById(id).classList.add('is-active');
    if (prop) {
      this.postToDelete = prop;
    }
  }

  closeModal(id: string) {
    document.getElementById(id).classList.remove('is-active');
  }

  checkIfUserLiked() {
    this.posts.forEach((post) => {
      if (post.liked) {
        post.liked.forEach((like) => {
          if (like._id === this.user._id) {
            post.userLiked = true;
          }
        });
      }
    });
  }

  unpinPost(post: Post) {
    post.isPined = false;
    this._feedService.pin(post).subscribe(() => {
      this.getPosts();
    });
  }

  // CSS FUNCTION
  addAlpha(color: string, opacity: number): string {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }
}
