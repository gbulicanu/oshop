import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent {
  categories$;

  @Input('category') category!: string | null;

  constructor(categories: CategoryService) {
    this.categories$ = categories.getAll();
  }
}
