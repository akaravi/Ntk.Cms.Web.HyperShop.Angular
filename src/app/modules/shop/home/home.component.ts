import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';

import { HyperShopContentModel } from 'ntk-cms-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  products: HyperShopContentModel[];
  public banners = [];
  public slides = [
    { title: 'Huge sale', subtitle: 'Up to 70%', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getBanners()
    .subscribe(
      data => this.banners = data
    );

 this.productService.getProducts()
 .subscribe(
   (product: HyperShopContentModel[]) => {
     this.products = product
   }
 )

  }






}
