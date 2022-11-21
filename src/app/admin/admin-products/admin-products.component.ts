import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Observable } from 'rxjs';
import { DataSnapshot } from '@angular/fire/database';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<any[]>;

  constructor(products: ProductService) {
    this.products$ = products.getAll();
  }

  ngOnInit(): void {
  }

}
