import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from './../../services/users.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import sign from 'jwt-encode';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  public user: User;
  public userUpdated: User;
  public file: File;
  public img: any;
  imageLoading = false;
  reader = new FileReader();
  fileName = '';

  constructor(
    private _usersService: UsersService,
    private _toastr: ToastrService,
    private _authService: AuthService,
    private _domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getPicture();
  }

  getUser() {
    this.user = jwt_decode(localStorage.getItem('CurrentUser')) as User;
  }

  getPicture() {
    this._usersService.getPicture(this.user).subscribe((picture) => {
      if (picture[0].img) {
        this.img = this._domSanitizer.bypassSecurityTrustResourceUrl(
          `data:image/png;base64, ${picture[0].img}`
        );
      }
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    this.imageLoading = true;
    imageCompression(file, { maxSizeMB: 3 }).then((file) => {
      this.reader.readAsBinaryString(file);

      this.reader.onload = () => {
        this._usersService
          .uploadPicture(btoa(<string>this.reader.result), this.user)
          .subscribe(
            (result) => {
              this._toastr.success('Photo publiée');
              this.imageLoading = false;
              this.getPicture();
            },
            (err) => {
              console.log(err);
            }
          );
      };

      if (file) {
        this.fileName = file.name;
        this.file = file;
      }
    });
  }

  saveInfos(f: NgForm) {
    this.userUpdated = {
      _id: this.user._id,
      firstname: f.value.firstname ? f.value.firstname : this.user.firstname,
      lastname: f.value.lastname ? f.value.lastname : this.user.lastname,
      mail: f.value.mail ? f.value.mail : this.user.mail,
      phone: f.value.phone ? f.value.phone : this.user.phone,
    } as User;
    this._usersService.updateUser(this.userUpdated).subscribe(
      (user) => {
        this._toastr.success('Informations modifiées !');
        localStorage.removeItem('CurrentUser');
        let token = {
          token: sign(user, 'el-tokenos-my-connect-19283746567-jfzofhouhouz'),
        };
        localStorage.setItem('CurrentUser', JSON.stringify(token));
        this.getUser();
        f.reset();
      },
      (err) => {
        this._toastr.error('Oups ' + err);
      }
    );
  }

  updatePassword(p: NgForm) {
    this._authService.login(this.user.mail, p.value.oldPassword).subscribe(
      (result) => {
        this._authService
          .updatePassword(p.value.newPassword, this.user._id)
          .subscribe(
            (user) => this._toastr.success('Mot de passe modifié !'),
            (err) => this._toastr.error('Oups ' + err)
          );
      },
      (err) => this._toastr.error('Oups ! Mot de passe incorrect ☹️')
    );
  }
}
