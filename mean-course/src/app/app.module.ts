import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import { MatButtonModule} from "@angular/material/button";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import { MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import { AppComponent } from "./app.component";
import { PostCreateComponent } from "./components/post-create/post-create.component";
import { HeaderComponent } from "./components/header/header.component";
import { PostListComponent } from "./components/post-list/post-list.component";
import { AppRoutingModule} from './app-routing.module';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthInterceptor } from './components/auth-interceptor'

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
