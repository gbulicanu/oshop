import { GoogleAuthProvider, User } from 'firebase/auth';
import { Injectable } from '@angular/core';
import { Auth, authState, signInWithRedirect, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private afa: Auth) {
    this.user$ = authState(afa);
  }

  login() {
    console.log('login:start');
    signInWithRedirect(this.afa, new GoogleAuthProvider())
      .then(c => console.log('login:end', c));
  }

  logout() {
    console.log('logout:start');
    signOut(this.afa).then(() => console.log('logout:end'));
  }
}
