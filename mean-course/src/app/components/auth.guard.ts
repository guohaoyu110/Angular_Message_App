import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router  } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  // add some interfaces your classes can implement which forces the classes to add certain methods
  // which the angular router
  constructor(private authService: AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // throw new Error("Methods not implmented.");
    const isAuth = this.authService.getIsAuth();
    if (!isAuth){
      this.router.navigate(['/login']);
    }
    return isAuth;

  }

}

// then the router will know which we were protecting is accessible
