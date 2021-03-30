import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	public users: User[];
	public usersDisplayed: User[];

	constructor(
		private _usersService: UsersService,
		private _toastr: ToastrService
	) { }

	ngOnInit(): void {
		this.getUsers();
	}

	getUsers() {
		this._usersService.getUsers()
			.subscribe(users => {
				this.users = users;
				this.usersDisplayed = users;
			}, err => {
				this._toastr.error("Une erreur est survenue : " + err.message)
			})
	}

	search(value: string) {
		console.log(value);
		this.usersDisplayed = this.users.filter(u => u.lastname.includes(value) || u.firstname.includes(value))
	}

	openModal(id: string) {
		document.getElementById(id).classList.add("is-active");
	}
	
	closeModal(id: string) {
		document.getElementById(id).classList.remove("is-active");
	}

	saveForm(f: NgForm) {
		this._usersService.addUser(f.form.value)
			.subscribe(user => {
				this._toastr.success(`L'utilisateur ${user.firstname} a bien été ajouté`);
				this.closeModal('modal-add-user');
				this.getUsers();
				f.reset();
			}, err => {
				this._toastr.error(err.errors.message)
			})
	}

	deleteUser(user: User) {
		this._usersService.deleteUser(user._id)
			.subscribe(() => {
				this._toastr.success("L'utilisateur a bien été supprimé");
				this.getUsers();
			}, err => this._toastr.error(err.errors.message))
	}
}
