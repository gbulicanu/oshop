import { Injectable } from '@angular/core';
import { Database, get, getDatabase, query, ref } from '@angular/fire/database';
import { orderByChild } from 'firebase/database';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  db: Database;

  constructor() {
    this.db = getDatabase();
  }

  getCategories(): Observable<any[]> {
    const categoriesListRef = ref(this.db, 'categories');
    return from(get(query(categoriesListRef, orderByChild('name'))))
     .pipe(map(result => result.val()));
  }
}
