import { GoogleAuthProvider, User } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth, authState, signInWithRedirect, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private afa: Auth, private route: ActivatedRoute) {
    this.user$ = authState(afa);
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
