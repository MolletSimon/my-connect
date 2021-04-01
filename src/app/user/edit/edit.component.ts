import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public user: User;

  constructor(
  ) { }

  ngOnInit(): void {
    this.user = jwt_decode(sessionStorage.getItem("CurrentUser")) as User;
    console.log(this.user)
  }

  saveInfos(f: NgForm) {
    console.log(f.value)
  }

  updatePassword(p: NgForm) {

  }
}
