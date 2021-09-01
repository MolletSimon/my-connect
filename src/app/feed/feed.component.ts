import { UsersService } from './../services/users.service';
import { Poll } from './../model/poll';
import { GroupService } from './../services/group.service';
import { PostsComponent } from './posts/posts.component';
import { User } from './../model/user';
import { FeedService } from './../services/feed.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Group } from '../model/group';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  user: User;
  groups: Group[] = [];
  groupsSelected: Group[] = [];
  post: Subject<any> = new Subject();
  poll: Poll;
  isPoll: boolean = false;
  i: number;

  constructor(
    private _feedService: FeedService,
    private _toastr: ToastrService,
    private _groupService: GroupService,
    private _usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getGroups();
  }

  savePost(f: NgForm) {
    if (this.groupsSelected.length > 0) {
      this.groupsSelected;
    } else {
      if (f.form.value['group'] == 'all') {
        this.groups.forEach((g) => this.groupsSelected.push(g));
      } else {
        this.groupsSelected.push(f.form.value['group'] as Group);
      }
    }
    this._feedService
      .publish(f.form.value['content'], this.user, this.groupsSelected)
      .subscribe((result) => {
        this.post.next();
        f.form.reset();
        this.groupsSelected = [];
        f.form.controls['group'].setValue('');
        this._toastr.info('Post publié !');
      });
  }

  savePoll() {
    if (!this.checkPoll()) return;

    this._feedService
      .publish('', this.user, this.groupsSelected, this.poll, true)
      .subscribe((result) => {
        this.post.next();
        this.isPoll = false;
        this.groupsSelected = [];
        this._toastr.info('Sondage publié !');
      });
  }

  checkPoll() {
    if (this.groupsSelected.length > 0) {
      this.groupsSelected;
    } else {
      let group = this.groups.find(
        (g) =>
          g._id == (<HTMLSelectElement>document.getElementById('group')).value
      );
      if (group) this.groupsSelected.push(group);
      else {
        if (
          (<HTMLSelectElement>document.getElementById('group')).value == 'all'
        ) {
          this.addGroup('all');
        } else {
          this._toastr.info(
            'Vous devez sélectionner au moins un groupe dans lequel poster votre sondage'
          );
          return;
        }
      }
    }

    if (!this.poll.content) {
      this._toastr.info('Veuillez saisir votre question');
      return false;
    }

    if (this.poll.answers.length < 2) {
      this._toastr.info(
        'Vous devez proposer au moins 2 choix de réponses différents'
      );
      return false;
    }

    return true;
  }

  getCurrentUser() {
    this.user = jwt_decode(localStorage.getItem('CurrentUser')) as User;
  }

  getGroups() {
    this._groupService
      .getGroups(this.user)
      .subscribe((groups) => (this.groups = groups));
  }

  addGroup(group) {
    if (group == 'all') {
      this.groups.forEach((g) => {
        this.groupsSelected.push(g);
      });
    } else {
      if (!this.groupsSelected.find((g) => g._id == group._id)) {
        this.groupsSelected.push(group);
      }
    }
  }

  openPoll() {
    this.i = 1;
    this.poll = {
      content: '',
      answers: [
        {
          id: this.i,
          name: '',
          nbVote: 0,
        },
        {
          id: this.i + 1,
          name: '',
          nbVote: 0,
        },
      ],
      hasVoted: false,
    } as unknown as Poll;
    this.i = 3;
    this.isPoll = true;
  }

  openPost() {
    this.isPoll = false;
  }

  addGroupToPoll() {
    let element = document.getElementById('group') as HTMLSelectElement;
    if (element.value) {
      if (element.value == 'all') {
        this.addGroup('all');
      } else {
        this.addGroup(this.groups.find((g) => g._id === element.value));
      }
    }
  }

  addChoice() {
    this.poll.answers.push({
      name: '',
      nbVote: 0,
      id: this.i,
      usersWhoVoted: [],
    });
    this.i++;
  }

  deleteChoice(id) {
    this.poll.answers = this.poll.answers.filter((a) => a.id != id);
  }

  openModal(id: string) {
    document.getElementById(id).classList.add('is-active');
  }

  closeModal(id: string) {
    document.getElementById(id).classList.remove('is-active');
  }

  removeGroup(group: Group) {
    this.groupsSelected = this.groupsSelected.filter((g) => g._id != group._id);
  }

  openFilter() {
    if (document.getElementById('filter').style.display == 'grid') {
      document.getElementById('filter').style.display = 'none';
    } else {
      document.getElementById('filter').style.display = 'grid';
    }
  }

  addAlpha(color: string, opacity: number): string {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }
}
