import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// manage the angular routes
import { PostListComponent} from './components/post-list/post-list.component';
import {PostCreateComponent} from './components/post-create/post-create.component'

const routes: Routes = [
  { path: '',component: PostListComponent},
  { path: 'create', component: PostCreateComponent},
  { path: 'edit/:postId', component: PostCreateComponent },
  // these routes are really not connected, they are runnign on differnt servers
  // our backend is running on localhost 3000 because that is the port we defined
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
