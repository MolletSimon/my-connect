import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  constructor() { }

  ngOnInit(): void {
    this.getCurrentUser();
    console.log(this.user)
  }

  getCurrentUser() {
    this.user = jwt_decode(sessionStorage.getItem("CurrentUser")) as User;
  }

}
