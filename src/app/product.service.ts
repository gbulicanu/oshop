import { Injectable } from '@angular/core';
import { child, Database, DatabaseReference, get, getDatabase, push, ref, remove, update } from '@angular/fire/database';
import { from, Observable, map } from 'rxjs';

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

  getAll(): Observable<{ [key: string]: { title: string, price: number } }> {
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

  delete(id: string): Observable<void> {
    return from(remove(ref(this.db, 'products/' + id)));
  }
}
