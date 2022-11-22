import { Injectable } from '@angular/core';
import { child, Database, DatabaseReference, DataSnapshot, get, getDatabase, push, ref, update } from '@angular/fire/database';
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

  get(id: string): Observable<any> {
    return from(get(child(ref(this.db), 'products/' + id)))
      .pipe(map(result => result.val()));
  }

  update(id: string, product: unknown): Observable<void> {
    return from(update(ref(this.db, 'products/' + id), <any>product));
  }
}
