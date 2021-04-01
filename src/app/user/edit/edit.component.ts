import { ToastrService } from 'ngx-toastr';
import { UsersService } from './../../services/users.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import sign from "jwt-encode";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public user: User;
  public userUpdated: User;

  constructor(
    private _usersService: UsersService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = jwt_decode(sessionStorage.getItem("CurrentUser")) as User;
  }

  saveInfos(f: NgForm) {
    console.log(f.value)
    this.userUpdated = {
      "_id": this.user._id,
      "firstname": f.value.firstname ? f.value.firstname : this.user.firstname,
      "lastname": f.value.lastname ? f.value.lastname : this.user.lastname,
      "mail": f.value.mail ? f.value.mail : this.user.mail,
      "phone": f.value.phone ? f.value.phone : this.user.phone,
    } as User
    this._usersService.updateUser(this.userUpdated)
      .subscribe(user => {
        this._toastr.success("Informations modifiées !");
        sessionStorage.removeItem("CurrentUser");
        sessionStorage.setItem("CurrentUser", sign(user, "el-tokenos-my-connect-19283746567-jfzofhouhouz"));
        this.getUser();
        f.reset();
      }, err => {
        this._toastr.error("Oups " + err);
      })
  }

  updatePassword(p: NgForm) {

  }
}
