import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  uploadFile(f: NgForm){
    console.log(f.value.file as File)
  } 

}
