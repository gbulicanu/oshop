import { Injectable } from '@angular/core';
import { Database, DatabaseReference, DataSnapshot, get, getDatabase, push, ref } from '@angular/fire/database';
import { from, Observable, pipe, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  db: Database;

  constructor() {
    this.db = getDatabase();
  }

  create(product: unknown): Observable<DatabaseReference> {
    return from(push(ref(this.db, 'products'), product));
  }

  getAll(): Observable<any[]> {
    return from(get(ref(this.db, 'products')))
      .pipe(map(snapshot => snapshot.val()));
  }
}
