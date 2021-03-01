import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { HyperShopContentModel } from 'ntk-cms-api';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.sass']
})
export class CompareComponent implements OnInit {

  public product            :   Observable<HyperShopContentModel[]> = of([]);
  public products           :   HyperShopContentModel[] = [];

  constructor(private productService: ProductService, private cartService: CartService) {

  }

  ngOnInit() {
    this.product = this.productService.getComapreProducts();
    this.product.subscribe(products => this.products = products);
    console.log(this.product);
  }

     // Add to cart
     public addToCart(product: HyperShopContentModel, quantity: number = 1) {
      this.cartService.addToCart(product, quantity);
   }

   // Remove from compare list
   public removeItem(product: HyperShopContentModel) {
     this.productService.removeFromCompare(product);
   }

}
