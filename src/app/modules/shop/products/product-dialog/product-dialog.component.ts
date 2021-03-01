import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CartService } from 'src/app/shared/services/cart.service';
import { Router } from '@angular/router';
import { HyperShopContentModel } from 'ntk-cms-api';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.sass']
})
export class ProductDialogComponent implements OnInit {

  public products           :   HyperShopContentModel[] = [];
  public counter            :   number = 1;
  public variantImage       :   any = '';
  public selectedColor      :   any = '';
  public selectedSize       :   any = '';

  constructor(private router: Router, public productsService: ProductService, private cartService: CartService, public dialogRef: MatDialogRef<ProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: HyperShopContentModel) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(product => this.products = product);

  }


  public addToCart(product: HyperShopContentModel, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
  }

  public close(): void {
    this.dialogRef.close();
  }

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if(this.counter >1){
       this.counter -= 1;
    }
  }

     // Add to cart
     public buyNow() {
      this.router.navigate(['/home/product', this.product.Code]);
      this.close();
   }

}
