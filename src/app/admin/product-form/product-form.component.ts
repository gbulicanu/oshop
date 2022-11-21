import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;

  constructor(
    private router: Router,
    private categories: CategoryService,
    private products: ProductService) {
    this.categories$ = categories.getCategories();
  }

  ngOnInit(): void {
  }

  save(product: unknown) {
    this.products.create(product);
    this.router.navigate(['admin/products'])
  }
}
