import { Auth, authState, signInWithRedirect } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private afa: Auth) {
    authState(afa).subscribe(as => console.log(as))
  }

  login() {
    console.log('login');
    signInWithRedirect(this.afa, new GoogleAuthProvider())
      .then(c => console.log('signInWithRedirect', c));
  }
}
