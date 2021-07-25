import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';

import { CoreSiteModel, HyperShopContentModel } from 'ntk-cms-api';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { AccessHelper } from 'src/app/core/common/helper/accessHelper';

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

  constructor(
    private productService: ProductService,
    private cmsStoreService: CmsStoreService,
    private accessHelper: AccessHelper,
  ) {
    debugger;

    const storeSnapshot = this.cmsStoreService.getStateSnapshot();
    if (storeSnapshot.coreSiteModelState) {
      this.coreSiteModel = storeSnapshot.coreSiteModelState;
    }
    else {
      debugger;
      this.coreSiteModel =this.accessHelper.DataCurrentSite().Item;
    }

  }
  coreSiteModel = new CoreSiteModel();
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
