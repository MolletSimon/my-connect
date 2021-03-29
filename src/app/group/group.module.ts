import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { FormsModule } from '@angular/forms';
import { ColorCircleModule } from 'ngx-color/circle';


@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    FormsModule,
    ColorCircleModule
  ]
})
export class GroupModule { }
