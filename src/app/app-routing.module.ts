import { LoginComponent } from './user/login/login.component';
import { FeedComponent } from './feed/feed.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full'},
  { path: 'agenda', component: AppComponent },
  { path: 'drive', component: AppComponent },
  { path: 'feed', loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule) },
  { path: 'login', component: LoginComponent},
  { path: 'group', loadChildren: () => import('./group/group.module').then(m => m.GroupModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
