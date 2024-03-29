import { Component, Input, OnInit } from '@angular/core';

import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../../shared/services/product.service';
import { CartService } from '../../../shared/services/cart.service';
import { CoreSiteModel, HyperShopContentModel } from 'ntk-cms-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-two',
  templateUrl: './home-two.component.html',
  styleUrls: ['./home-two.component.sass']
})
export class HomeTwoComponent implements OnInit {
  @Input()
  optionCoreSiteModel=new CoreSiteModel();

  products: HyperShopContentModel[];
  public banners = [];

  shoppingCartItems: CartItem[] = [];
  wishlistItems: HyperShopContentModel[] = [];

  public featuredProducts: Array<HyperShopContentModel>;
  public onSaleProducts: Array<HyperShopContentModel>;
  public topRatedProducts: Array<HyperShopContentModel>;
  public newArrivalsProducts: Array<HyperShopContentModel>;

  public slides = [
    { title: 'Huge sale', subtitle: 'Up to 70%', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
  ) {
    const splash = localStorage.getItem('splash');
    if (!splash || splash.length === 0) {
      this.router.navigate(['splash']);
    }
  }

  ngOnInit(): void {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.productService.getProducts()
      .subscribe(
        (product: HyperShopContentModel[]) => {
          this.products = product;
        }
      )
    this.productService.getBanners()
      .subscribe(
        data => this.banners = data
      );
  }



}
