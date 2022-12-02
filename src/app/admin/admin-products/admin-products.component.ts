import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products!: { [key: string]: { title: string, price: number } };
  filteredProducts!: { [key: string]: { title: string, price: number } };
  subscription: Subscription;

  constructor(products: ProductService) {
    this.subscription = products.getAll()
      .subscribe(allProducts =>
        this.filteredProducts = this.products = allProducts);
  }

  filter(query: string) {
    if (!query)  {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = Object.fromEntries(
      Object.entries(this.products)
        .filter(([, value]) =>
          value.title.toLowerCase().includes(query.toLowerCase())));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }
}
