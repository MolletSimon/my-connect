import { Router } from '@angular/router';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.user = jwt_decode(localStorage.getItem('CurrentUser')) as User;
  }

  disconnect() {
    localStorage.removeItem('CurrentUser');
    location.reload();
  }

  editUser() {
    this._router.navigate(['user']);
  }
}
