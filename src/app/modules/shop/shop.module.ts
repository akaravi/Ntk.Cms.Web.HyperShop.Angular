import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { PriceComponent } from './products/price/price.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { ProductVerticalComponent } from './products/product-vertical/product-vertical.component';
import { CommonModule } from '@angular/common';
import { ShopRouting } from './shop.routing';
import { SharedModule } from '../../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
import { HomeTwoComponent } from './home-two/home-two.component';
import { HomeThreeComponent } from './home-three/home-three.component';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ProductCarouselComponent } from './home/product-carousel/product-carousel.component';
import { ProductCarouselTwoComponent } from './home-two/product-carousel-two/product-carousel-two.component';
import { ProductCarouselThreeComponent } from './home-three/product-carousel-three/product-carousel-three.component';
import { BrandsComponent } from './widgets/brands/brands.component';
import { CategoriesComponent } from './widgets/categories/categories.component';
import { PopularProductsComponent } from './widgets/popular-products/popular-products.component';
import { HomeFourComponent } from './home-four/home-four.component';
import { ProductZoomComponent } from './products/product-details/product-zoom/product-zoom.component';
import { HomeFiveComponent } from './home-five/home-five.component';
import { HyperShopCategoryService, HyperShopContentService } from 'ntk-cms-api';


@NgModule({
  declarations: [
    HomeComponent,
    MainCarouselComponent,
    ProductsComponent,
    PriceComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductDialogComponent,
    ProductLeftSidebarComponent,
    ProductVerticalComponent,
    HomeTwoComponent,
    HomeThreeComponent,

    ProductCarouselComponent,
    ProductCarouselTwoComponent,
    ProductCarouselThreeComponent,
    BrandsComponent,
    CategoriesComponent,
    PopularProductsComponent,
    HomeFourComponent,
    ProductZoomComponent,
    HomeFiveComponent,
  ],
  imports: [
    CommonModule,
    ShopRouting,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    NgxImageZoomModule.forRoot() // <-- Add this line

  ],
  exports: [
    ProductDialogComponent,
    ProductZoomComponent

  ],

  entryComponents:[
    ProductDialogComponent,
    ProductZoomComponent
  ],
  providers:[
    HyperShopCategoryService,
    HyperShopContentService
  ]
})

export class ShopModule { }
