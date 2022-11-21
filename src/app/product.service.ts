import { Injectable } from '@angular/core';
import { Database, DatabaseReference, getDatabase, push, ref } from '@angular/fire/database';
import { from, Observable } from 'rxjs';

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
}
