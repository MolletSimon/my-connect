import  jwt_decode  from 'jwt-decode';
import { Group } from './../model/group';
import { GroupService } from './../services/group.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groups: Group[];
  user: User;
  progress = false;
  
  constructor(
    private _groupService: GroupService,
    private _toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getGroups();
    this.getCurrentUser();
  }

  getGroups() {
    this._groupService.getGroups()
      .subscribe(
        groups => this.groups = groups,
        err => console.error(err)
      )
  }

  getCurrentUser() {
    this.user = jwt_decode(sessionStorage.getItem("CurrentUser")) as User;
  }

  delete(id: string) {
    this.progress = true;
    this._groupService.deleteGroup(id).subscribe(result => {
      this._toastr.success(result.message);
      this.progress = false;
      this.getGroups();
    })
  }

  addGroup() {
    this.openModal('modal-add-group');
  }

  openModal(id: string) {
    document.getElementById(id).classList.add("is-active");
  }

  closeModal(id: string) {
    document.getElementById(id).classList.remove("is-active");
  }

}
