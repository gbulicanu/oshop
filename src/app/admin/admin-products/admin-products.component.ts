import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { Subscription } from 'rxjs';

import { ProductService } from '../../product.service';
import { Product } from '../../models/product';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  productsDataSource!: MatTableDataSource<Product>;
  displayedColumns: string[] = [ 'title', 'price', 'actions' ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    if (this.productsDataSource) {
      this.productsDataSource.paginator = this.paginator;
      this.productsDataSource.sort = this.sort;
    }
  }


  constructor(products: ProductService, private liveAnnouncer: LiveAnnouncer) {
    this.subscription = products.getAll()
      .subscribe(allProducts => {
        this.productsDataSource = new MatTableDataSource<Product>(
            Object.entries(allProducts).map(([key, product]) => ({key, ...product}))
          );

        this.productsDataSource.paginator = this.paginator;
        this.productsDataSource.sort = this.sort;

        this.productsDataSource.filterPredicate = (record, filter)  => {
          return record.title.toLowerCase().includes(filter.toLowerCase());
        }
      });
  }

  // Announce the change in sort state for assistive technology.
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  filter(query: string) {
    if (!query)  {
      this.productsDataSource.filter = '';
      return;
    }

    this.productsDataSource.filter = query.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
  }
}
