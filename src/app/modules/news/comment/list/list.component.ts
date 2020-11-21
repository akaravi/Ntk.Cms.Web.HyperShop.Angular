import { Component, OnInit } from '@angular/core';
import { ErrorExcptionResult, FilterModel, NewsCommentModel, NewsCommentService, FilterDataModel } from 'ntk-cms-api';

@Component({
  selector: 'app-news-comment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class NewsCommentListComponent implements OnInit {
  ParentId = 0;
  filterModel = new FilterModel();
  dataModelResult: ErrorExcptionResult<NewsCommentModel> = new ErrorExcptionResult<NewsCommentModel>();
  loadingStatus = false;
  constructor(
    private newsCommentService: NewsCommentService
  ) {


  }

  ngOnInit() {
    this.DataGetAll();
  }

  DataGetAll(): void {
    this.loadingStatus = true;


    this.filterModel.Filters = [];
    const filter = new FilterDataModel();
    filter.PropertyName = 'linkContentid';
    filter.Value = this.ParentId;
    this.filterModel.Filters.push(filter);

    this.newsCommentService.ServiceGetAll(this.filterModel).subscribe(
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
