import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  users: User[];
  mailAlreadyExist: boolean = false;

  constructor(
    private _usersService: UsersService,
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._usersService.getMails()
      .subscribe(users => {
        this.users = users;
      })
  }

  saveForm(f: NgForm) {
    this.checkMail(f.value.mail);
    this._authService.signUp(f.value)
      .subscribe(() => {
        this._router.navigate(['login']);
      });
  }

  checkMail(mail: string) {
    if(this.users.find(u => u.mail === mail)) {
      this.mailAlreadyExist = true;
      return;
    }
  }

  cancel() {
    this._router.navigate(['login'])
  }

}
