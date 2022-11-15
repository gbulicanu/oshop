import { Injectable } from '@angular/core';
import { child, Database, get, getDatabase, ref, update } from "@angular/fire/database";
import { User } from 'firebase/auth';
import { from, Observable, map } from 'rxjs';
import { AppUser } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  db: Database;

  constructor() {
    this.db = getDatabase();
  }

  save(user: User) {
    update(ref(this.db, 'users/' + user.uid), {
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    return from(get(child(ref(this.db), 'users/' + uid)))
      .pipe(map(result => result.val()));
  }
}
