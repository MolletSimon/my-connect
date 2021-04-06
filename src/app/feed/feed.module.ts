import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { PostsComponent } from './posts/posts.component';
import { FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [FeedComponent, PostsComponent],
  imports: [
    CommonModule,
    FeedRoutingModule,
    FormsModule,
    NgxChartsModule
  ]
})
export class FeedModule { }
