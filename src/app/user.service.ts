import { Injectable } from '@angular/core';
import { Database, getDatabase, ref, set } from "@angular/fire/database";
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  db: Database;

  constructor() {
    this.db = getDatabase();
  }

  save(user: User) {
    set(ref(this.db, 'users/' + user.uid), {
      name: user.displayName,
      email: user.email
    });
  }
}
