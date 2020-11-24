import { Component, OnInit } from '@angular/core';
import { ErrorExcptionResult, FilterModel, HyperShopCategoryModel, HyperShopCategoryService } from 'ntk-cms-api';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.sass']
})
export class CategoriesMenuComponent implements OnInit {
  filterModelCategory = new FilterModel();
  dataModelResult: ErrorExcptionResult<HyperShopCategoryModel> = new ErrorExcptionResult<HyperShopCategoryModel>();
  loadingStatus = false;

  constructor(private hyperShopCategoryService: HyperShopCategoryService) { }

  ngOnInit() {
    this.DataGetAll();

  }

  DataGetAll(): void {
    this.loadingStatus = true;
    this.filterModelCategory.AccessLoad = true;
    this.hyperShopCategoryService.ServiceGetAll(this.filterModelCategory).subscribe(
      (next) => {
        if (next.IsSuccess) {
          this.dataModelResult = next;
        }
        this.loadingStatus = false;

      },
      (error) => {
        this.loadingStatus = false;

      }
    );
  }
}
