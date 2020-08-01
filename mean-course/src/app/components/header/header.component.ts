import { Component, OnDestroy, OnInit } from "@angular/core";

import { AuthService } from "../auth.service";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  private authListenerSubs : Subscription;
  userIsAuthenticated = false;
  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    // clear the token and about the changed authentication status and for that we need to change the auth service again
    this.authService.logout();
  }
  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
  }
}
