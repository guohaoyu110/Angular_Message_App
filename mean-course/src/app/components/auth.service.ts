import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";
import { Router } from '@angular/router';

@Injectable ({ providedIn: "root"})

export class AuthService {
  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  constructor (private http: HttpClient, private router: Router){}

  getToken(){
     return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  createuser(email: string, password: string) {
    const authData: AuthData = {email: email, password: password};
    this.http.post("http://localhost:3000/api/user/signup", authData)
      .subscribe(response => {
        console.log(response);

      });
  }

  login(email: string, password: string){
    const authData : AuthData = {email: email, password : password};
    this.http.post<{token: string}>("http://localhost:3000/api/user/login", authData)
    // we will get back a response object which has a token field which is of type string
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        this.token = token;
        if (token){
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
        // that's a check i should add anyways, only if we have a valid token, only then i want to set this to true
        // and only then i will change the status
      });
  }

  logout(){ // this is what i want to execute when we call logout
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}
