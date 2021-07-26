import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';

import { CoreSiteModel, HyperShopContentModel } from 'ntk-cms-api';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { AccessHelper } from 'src/app/core/common/helper/accessHelper';
import { Router } from '@angular/router';
import { PublicHelper } from 'src/app/core/common/helper/publicHelper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  @Input()
  optionCoreSiteModel=new CoreSiteModel();

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
    private publicHelper: PublicHelper,
    private router: Router,
  ) {
    const splash = localStorage.getItem('splash');
    if (!splash || splash.length == 0) {
      this.router.navigate(['splash']);
    }
    const storeSnapshot = this.cmsStoreService.getStateSnapshot();
    if (storeSnapshot && storeSnapshot.coreSiteModelState) {
      this.coreSiteModel = storeSnapshot.coreSiteModelState;
    }
    else {
      debugger;
      this.coreSiteModel = this.publicHelper.DataCurrentSite().Item;
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
