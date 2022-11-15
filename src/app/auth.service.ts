import { UserService } from './user.service';
import { GoogleAuthProvider, User } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth, authState, signInWithRedirect, signOut } from '@angular/fire/auth';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appUserSubject: BehaviorSubject<AppUser | null> = new BehaviorSubject<AppUser | null>(null);

  user$: Observable<User | null>;
  appUser$: Observable<AppUser | null> = this.appUserSubject.asObservable();

  constructor(private afa: Auth, private route: ActivatedRoute, private users: UserService) {
    this.user$ = authState(afa)
      .pipe(tap(user => {
        if(user) {
          this.users.get(user.uid)
            .subscribe(appUser => this.appUserSubject.next(appUser))
        }
        else {
          this.appUserSubject.next(null);
        }
      }));
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    console.log('login:start');
    signInWithRedirect(this.afa, new GoogleAuthProvider())
      .then(c => console.log('login:end', c));
  }

  logout() {
    console.log('logout:start');
    signOut(this.afa).then(() => console.log('logout:end'));
  }
}
