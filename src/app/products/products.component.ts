import { Component } from '@angular/core';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products$;
  categories$;

  constructor(categories: CategoryService, products: ProductService) {
    this.products$ = products.getAll();
    this.categories$ = categories.getAll();
  }

}
