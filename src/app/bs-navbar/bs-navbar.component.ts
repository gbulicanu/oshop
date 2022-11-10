import { Component } from '@angular/core';
import { Auth, authState, signOut } from '@angular/fire/auth';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  constructor(private afa: Auth) {
    authState(afa).subscribe(as => console.log(as))
  }

  logout() {
    console.log('logout');
    signOut(this.afa).then(() => console.log('signOut'));
  }

}
