import {
  CoreSiteModel,
  ErrorExceptionResult,
  FilterModel,
  HyperShopCategoryService,
  HyperShopContentModel,
  HyperShopContentService,
} from 'ntk-cms-api';
import { Component, OnInit } from '@angular/core';

import { CartItem } from 'src/app/modals/cart-item';

import { CartService } from '../../../shared/services/cart.service';
import { CmsStoreService } from 'src/app/core/reducers/cmsStore.service';
import { AccessHelper } from 'src/app/core/common/helper/accessHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-three',
  templateUrl: './home-three.component.html',
  styleUrls: ['./home-three.component.sass'],
})
export class HomeThreeComponent implements OnInit {
  filterModelCategory = new FilterModel();
  dataModelContentResult: ErrorExceptionResult<HyperShopContentModel> = new ErrorExceptionResult<HyperShopContentModel>();
  loadingStatus = false;
  constructor(
    private cartService: CartService,
    private hyperShopContentService: HyperShopContentService,
    private cmsStoreService: CmsStoreService,
    private accessHelper: AccessHelper,
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
      this.coreSiteModel = this.accessHelper.DataCurrentSite().Item;
    }

  }
  coreSiteModel = new CoreSiteModel();

  products: HyperShopContentModel[];
  public banners = [];

  shoppingCartItems: CartItem[] = [];
  wishlistItems: HyperShopContentModel[] = [];

  public featuredProducts: Array<HyperShopContentModel>;
  public onSaleProducts: Array<HyperShopContentModel>;
  public topRatedProducts: Array<HyperShopContentModel>;
  public newArrivalsProducts: Array<HyperShopContentModel>;

  public slides = [
    {
      title: 'Huge sale',
      subtitle: 'Up to 70%',
      image: 'assets/images/carousel/banner1.jpg',
    },
    {
      title: 'Biggest discount',
      subtitle: 'Check the promotion',
      image: 'assets/images/carousel/banner2.jpg',
    },
    {
      title: 'Biggest sale',
      subtitle: 'Dont miss it',
      image: 'assets/images/carousel/banner3.jpg',
    },
    {
      title: 'Our best products',
      subtitle: 'Special selection',
      image: 'assets/images/carousel/banner4.jpg',
    },
    {
      title: 'Massive sale',
      subtitle: 'Only for today',
      image: 'assets/images/carousel/banner5.jpg',
    },
  ];

  // Collection banner
  public discount = [
    {
      image: 'assets/images/product/tablet_bn.png',
      title: 'Tablets, Smartphones and more',
      subtitle: 'Sale up to 30%',
    },
    {
      image: 'assets/images/product/camera_bn.png',
      title: 'New Cameras Collection',
      subtitle: 'Sale up to 30%',
    },
  ];

  ngOnInit() {
    debugger;
    this.cartService
      .getItems()
      .subscribe(
        (shoppingCartItems) => (this.shoppingCartItems = shoppingCartItems)
      );
    // this.productService.getProducts().subscribe((product: HyperShopContentModel[]) => {
    //   this.products = product;
    //   console.log(product);
    // });
    this.DataProductGetAll();
  }

  DataProductGetAll(): void {
    this.loadingStatus = true;
    this.filterModelCategory.AccessLoad = true;
    this.hyperShopContentService
      .ServiceGetAllMicroService(this.filterModelCategory)
      .subscribe(
        (next) => {
          if (next.IsSuccess) {
            this.dataModelContentResult = next;
          }
          this.loadingStatus = false;
        },
        (error) => {
          this.loadingStatus = false;
        }
      );
  }
}
