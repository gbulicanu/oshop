import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { Product } from '../models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: { [key: string]: Product } = {};
  filteredProducts: Product[] = [];
  categories$;
  category!: string | null;

  constructor(
    categories: CategoryService,
    products: ProductService,
    route: ActivatedRoute) {
    products.getAll().subscribe(p => this.products = p);
    this.categories$ = categories.getAll();

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

      this.filteredProducts = this.category
        ? Object.entries(this.products).map(([key, product]) => ({key, ...product})).filter(p => p.category === this.category)
        : Object.entries(this.products).map(([key, product]) => ({key, ...product}));
    })
  }

}
