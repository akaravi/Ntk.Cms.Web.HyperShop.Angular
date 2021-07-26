import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { CartService } from 'src/app/shared/services/cart.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CoreSiteModel, HyperShopContentModel } from 'ntk-cms-api';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-carousel-three',
  templateUrl: './product-carousel-three.component.html',
  styleUrls: ['./product-carousel-three.component.sass'],
})
export class ProductCarouselThreeComponent implements OnInit, AfterViewInit {
  @Input()
  optionCoreSiteModel=new CoreSiteModel();
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter<any>();
  @Input('product') product: Array<HyperShopContentModel> = [];
  public config: SwiperConfigInterface = {};

  constructor(
    private cartService: CartService,
    private productsService: ProductService,
    private wishlistService: WishlistService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  // @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

  ngOnInit() { }
  ngAfterViewInit(): void {
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1,
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
      },
    };
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
    dialogRef.afterClosed().subscribe((product) => {
      if (product) {
        this.router.navigate(['/products', product.id, product.Name]);
      }
    });
  }
}
