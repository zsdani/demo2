import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../Services/auth.service";
import {Observable} from "rxjs";
import { map, take, tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    protected as: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.as.isLoggedIn().pipe(
      take(1),
      map(s => !!s),
      tap(loggedIn => {
        if (!loggedIn) {
          console.error('Hozzáférés megtagadva!');
          this.router.navigate(['/mainpage']);
          return false;
        }
      })
    );
  }
}
