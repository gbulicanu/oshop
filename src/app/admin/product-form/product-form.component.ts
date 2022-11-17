import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;

  constructor(categories: CategoryService) {
    this.categories$ = categories.getCategories();
  }

  ngOnInit(): void {
  }

}
