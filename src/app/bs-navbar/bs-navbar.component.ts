import { Component } from '@angular/core';
import { Auth, authState, signOut, User } from '@angular/fire/auth';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  user: User | null = null;

  constructor(private afa: Auth) {
    authState(afa).subscribe(user => this.user = user)
  }

  logout() {
    console.log('logout');
    signOut(this.afa).then(() => console.log('signOut'));
  }

}
