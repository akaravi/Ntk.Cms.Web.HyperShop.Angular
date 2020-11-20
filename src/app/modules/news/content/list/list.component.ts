import { Component, OnInit } from '@angular/core';
import { ErrorExcptionResult, FilterModel, NewsContentModel, NewsContentService } from 'ntk-cms-api';

@Component({
  selector: 'app-news-content-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class NewsContentListComponent implements OnInit {
  filteModelContent = new FilterModel();
  filteModelCategory = new FilterModel();
  dataModelResult: ErrorExcptionResult<NewsContentModel> = new ErrorExcptionResult<NewsContentModel>();
  loadingStatus = false; // add one more property

  constructor(private newsContentService: NewsContentService) { }

  ngOnInit() {
    this.DataGetAllContent();
  }

  DataGetAllContent(): void {
    this.loadingStatus = true;
    this.filteModelContent.AccessLoad = true;
    this.newsContentService.ServiceGetAll(this.filteModelContent).subscribe(
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
