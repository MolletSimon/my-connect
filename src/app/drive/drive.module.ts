import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriveRoutingModule } from './drive-routing.module';
import { DriveComponent } from './drive.component';


@NgModule({
  declarations: [DriveComponent],
  imports: [
    CommonModule,
    DriveRoutingModule,
    FormsModule
  ]
})
export class DriveModule { }
