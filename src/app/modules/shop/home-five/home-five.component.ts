import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { CartService } from '../../../shared/services/cart.service';
import { CartItem } from 'src/app/modals/cart-item';

import { CoreSiteModel, HyperShopContentModel } from 'ntk-cms-api';

@Component({
  selector: 'app-home-five',
  templateUrl: './home-five.component.html',
  styleUrls: ['./home-five.component.sass']
})
export class HomeFiveComponent implements OnInit {
  @Input()
  optionCoreSiteModel=new CoreSiteModel();

  constructor(private productService: ProductService, private cartService: CartService) { }
  products: HyperShopContentModel[];
  shoppingCartItems: CartItem[] = [];

  public slides = [
    { title: 'Huge sale', subtitle: 'Up to 70%', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
  ];


  // Collection banner
  public discount = [{
    image: 'assets/images/product/tablet_bn.png',
    title: 'Tablets, Smartphones and more',
    subtitle: 'Sale up to 30%',
  }, {
    image: 'assets/images/product/camera_bn.png',
    title: 'New Cameras Collection',
    subtitle: 'Sale up to 30%',
  }]

  ngOnInit(): void {

    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.productService.getProducts()
      .subscribe(
        (product: HyperShopContentModel[]) => {
          this.products = product;
        }
      )
  }

}


