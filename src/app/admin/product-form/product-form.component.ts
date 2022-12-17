import { Observable, take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any[]>;
  product: Product = {
    title: '',
    price: 0,
    category: '',
    imageUrl: ''
  };
  id: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categories: CategoryService,
    private products: ProductService) {
    this.categories$ = this.categories.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.products.get(this.id).pipe(take(1)).subscribe(p => this.product = p)
  }

  ngOnInit(): void {
  }

  save(product: Product) {
    if (!this.id) this.products.create(product);
    else this.products.update(this.id, product);

    this.router.navigate(['admin/products']);
  }

  delete() {
    if(!confirm('Are yous sure you want to delete this product?')) return;

    this.products.delete(this.id!);
    this.router.navigate(['admin/products'])
  }
}
