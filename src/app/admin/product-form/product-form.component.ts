import { Observable, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categories: CategoryService,
    private products: ProductService) {
    this.categories$ = this.categories.getCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.products.get(id).pipe(take(1)).subscribe(p => this.product = p)
  }

  ngOnInit(): void {
  }

  save(product: unknown) {
    this.products.create(product);
    this.router.navigate(['admin/products'])
  }
}
