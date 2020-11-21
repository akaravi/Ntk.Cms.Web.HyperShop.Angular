import { Component, OnInit } from '@angular/core';
import { ErrorExcptionResult, NewsCommentModel, NewsCommentService } from 'ntk-cms-api';

@Component({
  selector: 'app-news-comment-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class NewsCommentAddComponent implements OnInit {
  dataModel = new NewsCommentModel();
  dataModelResult: ErrorExcptionResult<NewsCommentModel> = new ErrorExcptionResult<NewsCommentModel>();
  loadingStatus = false;
  ParentId = 0;

  constructor(
    private newsCommentService: NewsCommentService

  ) { }

  ngOnInit() {
  }
  DataAdd(): void {
    this.loadingStatus = true;

    this.dataModel.LinkContentId = this.ParentId;
    this.newsCommentService.ServiceAdd(this.dataModel).subscribe(
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
