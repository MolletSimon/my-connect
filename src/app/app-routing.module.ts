import { SignupComponent } from './user/signup/signup.component';
import { EditComponent } from './user/edit/edit.component';
import { LoginComponent } from './user/login/login.component';
import { FeedComponent } from './feed/feed.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full'},
  { path: 'feed', loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule) },
  { path: 'login', component: LoginComponent},
  { path: 'group', loadChildren: () => import('./group/group.module').then(m => m.GroupModule) },
  { path: 'agenda', loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaModule) },
  { path: 'drive', loadChildren: () => import('./drive/drive.module').then(m => m.DriveModule) },
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'user', component: EditComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
