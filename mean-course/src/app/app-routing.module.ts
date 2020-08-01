import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// manage the angular routes
import { PostListComponent} from './components/post-list/post-list.component';
import {PostCreateComponent} from './components/post-create/post-create.component'
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './components/auth.guard'


const routes: Routes = [
  { path: "",component: PostListComponent},
  { path: "create", component: PostCreateComponent, canActivate: [AuthGuard]},
  { path: "edit/:postId", component: PostCreateComponent , canActivate: [AuthGuard]},
  { path: "login", component: LoginComponent},
  { path: "signup", component: SignupComponent}
  // these routes are really not connected, they are runnign on differnt servers
  // our backend is running on localhost 3000 because that is the port we defined
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
  // with that made available, now you just need to attach it to the routes you want to protect
})
export class AppRoutingModule {

}


// in this case, if you directly create, you go to the login page first
