import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';

import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { HyperShopContentModel } from 'ntk-cms-api';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-carousel',
  templateUrl: './product-carousel.component.html',
  styleUrls: ['./product-carousel.component.sass']
})
export class ProductCarouselComponent implements OnInit, AfterViewInit {
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter<any>();
  @Input('product') product: Array<HyperShopContentModel> = [];
  public config: SwiperConfigInterface = {};
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.config = {
      observer: true,
      slidesPerView: 5,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },


      }
    }
  }


  public openProductDialog(product): void {
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

  // Add to cart
  public addToCart(product: HyperShopContentModel, quantity: number = 1): void {
    this.cartService.addToCart(product, quantity);
    console.log(product, quantity);
  }

  // Add to wishlist
  public addToWishlist(product: HyperShopContentModel): void {
    this.wishlistService.addToWishlist(product);
  }

  // Add to compare
  public addToCompare(product: HyperShopContentModel): void {
    this.productService.addToCompare(product);
  }
}
