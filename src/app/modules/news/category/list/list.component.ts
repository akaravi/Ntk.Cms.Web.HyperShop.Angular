import { Component, OnInit } from '@angular/core';
import { ErrorExcptionResult, FilterModel, NewsCategoryModel, NewsCategoryService } from 'ntk-cms-api';

@Component({
  selector: 'app-news-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class NewsCategoryListComponent implements OnInit {
  filterModelCategory = new FilterModel();
  dataModelResult: ErrorExcptionResult<NewsCategoryModel> = new ErrorExcptionResult<NewsCategoryModel>();
  loadingStatus = false;

  constructor(private newsCategoryService: NewsCategoryService) { }

  ngOnInit() {
    this.DataGetAll();
  }

  DataGetAll(): void {
    this.loadingStatus = true;
    this.filterModelCategory.AccessLoad = true;
    this.newsCategoryService.ServiceGetAll(this.filterModelCategory).subscribe(
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
