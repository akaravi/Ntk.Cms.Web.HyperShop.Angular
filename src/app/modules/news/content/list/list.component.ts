import { Component, OnInit } from '@angular/core';
import { ErrorExcptionResult, FilterModel, NewsContentModel, NewsContentService } from 'ntk-cms-api';

@Component({
  selector: 'app-news-content-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class NewsContentListComponent implements OnInit {
  filterModelContent = new FilterModel();
  filterModelCategory = new FilterModel();
  dataModelResult: ErrorExcptionResult<NewsContentModel> = new ErrorExcptionResult<NewsContentModel>();
  loadingStatus = false;

  constructor(private newsContentService: NewsContentService) { }

  ngOnInit() {
    this.DataGetAll();
  }

  DataGetAll(): void {
    this.loadingStatus = true;
    this.filterModelContent.AccessLoad = true;
    this.newsContentService.ServiceGetAll(this.filterModelContent).subscribe(
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
