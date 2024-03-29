import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Router } from '@angular/router';

import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { CoreSiteModel, HyperShopContentModel } from 'ntk-cms-api';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  @Input()
  optionCoreSiteModel=new CoreSiteModel();
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input() product: HyperShopContentModel;

  constructor(
    private cartService: CartService,
    public productsService: ProductService,
    private wishlistService: WishlistService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

  // Add to cart
  public addToCart(product: HyperShopContentModel, quantity: number = 1) {
    this.cartService.addToCart(product, quantity);
    console.log(product, quantity);
  }

  // Add to wishlist
  public addToWishlist(product: HyperShopContentModel) {
    this.wishlistService.addToWishlist(product);
  }

  // Add to compare
  public addToCompare(product: HyperShopContentModel) {
    this.productsService.addToCompare(product);
  }


  public openProductDialog(product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.Name]);
      }
    });
  }

}
