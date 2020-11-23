import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HyperShopComponent } from './hyperShop.component';
import { HyperShopCategoryService, HyperShopContentService } from 'ntk-cms-api';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HyperShopComponent],
  providers:[
    HyperShopContentService,
    HyperShopCategoryService,

  ]
})
export class HyperShopModule { }
