import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorExcptionResult, NewsContentModel, NewsContentService } from 'ntk-cms-api';

@Component({
  selector: 'app-news-content-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class NewsContentViewComponent implements OnInit {
  Id = 0;
  dataModelResult: ErrorExcptionResult<NewsContentModel> = new ErrorExcptionResult<NewsContentModel>();
  loadingStatus = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private newsContentService: NewsContentService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.Id = +params.id || 0;
    });
    this.DataGetOne();
  }
  DataGetOne() {
    this.loadingStatus = true;

    this.newsContentService.ServiceGetOneById(this.Id).subscribe(
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
