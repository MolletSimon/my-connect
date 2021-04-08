import  jwt_decode  from 'jwt-decode';
import { Group } from './../model/group';
import { GroupService } from './../services/group.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groups: Group[];
  user: User;
  progress = false;
  color: string;

  
  constructor(
    private _groupService: GroupService,
    private _toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getGroups();
  }

  getGroups() {
    this._groupService.getGroups(this.user)
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

  saveGroup(f: NgForm) {
    if (!this.color) {
      this._toastr.error("Vous devez saisir une couleur pour le groupe");
      return;
    }
    this.progress = true;
    f.value.color = this.color;
    this._groupService.addGroup(f.value)
      .subscribe(result => {
        this.progress = false;
        this.closeModal('modal-add-group');
        this.getGroups();
        f.reset();
      })
  }

  changeComplete(color) {
    this.color = color.color.hex;
  }

  // CSS FUNCTION
  addAlpha(color: string, opacity: number): string {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }
}
