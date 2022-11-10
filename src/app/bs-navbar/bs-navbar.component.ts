import { Component } from '@angular/core';
import { Auth, authState, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user$: Observable<User | null>;

  constructor(private afa: Auth) {
    this.user$ = authState(afa);
  }

  logout() {
    console.log('logout');
    signOut(this.afa).then(() => console.log('signOut'));
  }

}
