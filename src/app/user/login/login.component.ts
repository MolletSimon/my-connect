import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mail: String;
  password: String;
  loading: boolean;

  constructor(
    private _authService: AuthService,
    private _toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('CurrentUser')) {
      this._router.navigate(['feed']);
    }
  }

  signUp() {
    this._router.navigate(['signup']);
  }

  login() {
    this.loading = true;
    if (this.mail && this.password)
      this._authService.login(this.mail, this.password).subscribe(
        (result) => {
          sessionStorage.setItem('CurrentUser', JSON.stringify(result));
          this._router.navigate(['feed']);
          location.reload();
        },
        (error) => {
          this._toastr.error(error.error.message);
          this._router.navigate(['login']);
          // location.reload();
        }
      );
  }
}
