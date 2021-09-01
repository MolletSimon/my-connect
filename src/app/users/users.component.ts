import { Router } from '@angular/router';
import { Group } from './../model/group';
import { GroupService } from './../services/group.service';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[];
  public usersDisplayed: User[];
  public groups: Group[];
  public groupsAdded: Group[] = [];
  user: User;
  private idUser: string;

  constructor(
    private _usersService: UsersService,
    private _toastr: ToastrService,
    private _groupService: GroupService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.checkSuperAdmin();
    this.getUsers();
    this.getGroups();
  }

  getCurrentUser() {
    this.user = jwt_decode(localStorage.getItem('CurrentUser')) as User;
  }

  checkSuperAdmin() {
    if (!this.user.isSuperadmin) {
      this._router.navigate(['feed']);
      return;
    }
  }

  getUsers() {
    this._usersService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.usersDisplayed = users;
      },
      (err) => {
        this._toastr.error('Une erreur est survenue : ' + err.message);
      }
    );
  }

  getGroups() {
    this._groupService.getGroups(this.user).subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  search(value: string) {
    value = value.toLowerCase();
    this.usersDisplayed = this.users.filter(
      (u) =>
        u.lastname.toLowerCase().includes(value) ||
        u.firstname.toLowerCase().includes(value)
    );
  }

  openModal(id: string, idUser?: string) {
    if (idUser) {
      this.idUser = idUser;
    }
    document.getElementById(id).classList.add('is-active');
  }

  closeModal(id: string) {
    document.getElementById(id).classList.remove('is-active');
    this.resetSelect();
    this.groupsAdded = [];
  }

  saveForm(f: NgForm) {
    this._usersService.addUser(f.form.value).subscribe(
      (user) => {
        this._toastr.success(
          `L'utilisateur ${user.firstname} a bien été ajouté`
        );
        this.closeModal('modal-add-user');
        this.getUsers();
        f.reset();
      },
      (err) => {
        this._toastr.error(err.errors.message);
      }
    );
  }

  deleteUser(user: User) {
    this._usersService.deleteUser(user._id).subscribe(
      () => {
        this._toastr.success("L'utilisateur a bien été supprimé");
        this.getUsers();
      },
      (err) => this._toastr.error(err.errors.message)
    );
  }

  sortGroup(value) {
    this.usersDisplayed = [];
    if (value === 'all') {
      this.usersDisplayed = this.users;
      return;
    }

    this.users.forEach((user) => {
      if (user.isSuperadmin) {
        this.usersDisplayed.push(user);
      }

      user.groups.forEach((group) => {
        if (group._id === value) {
          this.usersDisplayed.push(user);
        }
      });
    });
  }

  addAlpha(color: string, opacity: number): string {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

  addGroup() {
    this.resetSelect();
  }

  removeGroup(group: Group) {
    this.groupsAdded = this.groupsAdded.filter((g) => g._id != group._id);
  }

  resetSelect() {
    (<HTMLSelectElement>document.getElementById('add-group')).value = '';
  }

  saveGroup() {
    this._usersService
      .addGroupToUser(this.idUser, this.groupsAdded)
      .subscribe(() => {
        this._toastr.success('Groupe ajouté !');
        this.getUsers();
        this.groupsAdded = [];
        this.closeModal('modal-add-group');
        this.resetSelect();
      });
  }

  addOneGroup(id) {
    this.groupsAdded.push(this.groups.find((g) => g._id === id));
  }

  removeGroupFromUser(group: Group, user: User) {
    this.usersDisplayed = [];
    user.groups = user.groups.filter((u) => u._id != group._id);
    this._usersService.updateUser(user).subscribe(
      () => {
        this._toastr.success('Groupe supprimé !');
        this.usersDisplayed = this.users;
      },
      (err) => {
        this._toastr.error('Oups, une erreur est survenue');
      }
    );
  }
}
