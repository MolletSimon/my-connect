import { AppModule } from './../app.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { PostsComponent } from './posts/posts.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FeedComponent, PostsComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    FormsModule
  ]
})
export class FeedModule { }
