import { Component, Input } from '@angular/core';
import { Product } from '../models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product!: Product
  @Input('show-actions') showActions = true;

  constructor() { }
}
