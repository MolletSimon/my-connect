import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  userInitialized = false;

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
      
    }
  }
}
