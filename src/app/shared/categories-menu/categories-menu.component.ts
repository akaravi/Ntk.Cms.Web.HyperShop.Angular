import { Component, OnInit } from '@angular/core';
import { ErrorExceptionResult, FilterModel, HyperShopCategoryModel, HyperShopCategoryService } from 'ntk-cms-api';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.sass']
})
export class CategoriesMenuComponent implements OnInit {
  filterModelCategory = new FilterModel();
  dataModelResult: ErrorExceptionResult<HyperShopCategoryModel> = new ErrorExceptionResult<HyperShopCategoryModel>();
  loadingStatus = false;

  constructor(private hyperShopCategoryService: HyperShopCategoryService) { }

  ngOnInit() {
    this.DataGetAll();

  }

  DataGetAll(): void {
    this.loadingStatus = true;
    this.filterModelCategory.accessLoad = true;
    this.hyperShopCategoryService.ServiceGetAllMicroService(this.filterModelCategory).subscribe(
      (next) => {
        if (next.isSuccess) {
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
