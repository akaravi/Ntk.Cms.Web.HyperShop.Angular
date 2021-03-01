import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/shared/services/product.service';
import { HyperShopContentModel } from 'ntk-cms-api';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.sass']
})
export class PopularProductsComponent implements OnInit {

  public products: HyperShopContentModel[];
  public product: HyperShopContentModel = new HyperShopContentModel();

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(product => this.products = product);
  }
}
