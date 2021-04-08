import { User } from './model/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  userInitialized = false;
  user: User;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    if(!sessionStorage.getItem("CurrentUser")) {
      this._router.navigate(['login']);
      this.userInitialized = false;
    } else {
      this.userInitialized = true;
      this.user = jwt_decode(sessionStorage.getItem("CurrentUser")) as User;
    }
  }
}
