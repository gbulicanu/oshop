import { from, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from '../../product.service';
import { DatabaseReference } from '@angular/fire/database';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;

  constructor(categories: CategoryService, private products: ProductService) {
    this.categories$ = categories.getCategories();
  }

  ngOnInit(): void {
  }

  save(product: unknown) {
    return from(this.products.create(product));
  }

}
