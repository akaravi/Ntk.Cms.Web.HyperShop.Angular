import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  CoreModuleTagModel,
   CoreModuleTagService,
    ErrorExceptionResult,
    FilterModel,
    NewsContentModel, NewsContentService, NewsContentTagService, EnumSortType, FilterDataModel, NewsCommentService, NewsCommentModel } from 'ntk-cms-api';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.sass']
})
export class NewsDetailsComponent implements OnInit {
  dataModelResult = new ErrorExceptionResult<NewsContentModel>();
  dataModelCommentResult = new ErrorExceptionResult<NewsCommentModel>();
  dataModelTagResult = new ErrorExceptionResult<CoreModuleTagModel>();
  dataModelTagRelatResult = new ErrorExceptionResult<CoreModuleTagModel>();
  dataModelComment = new NewsCommentModel();

  constructor(private newsContentService: NewsContentService,
    private newsContentTagService: NewsContentTagService,
    private newsCommentService: NewsCommentService,
    private coreModuleTagService: CoreModuleTagService,
    private route: ActivatedRoute) {

    this.route.params.subscribe(
      (params: Params) => {
        this.dataGetOne(params.id)
        this.dataConetntTagGetAll(params.id)
      }
    )
  }

  ngOnInit() {
    this.dataTagGetAll();
  }
  dataGetOne(id: number): void {
    this.newsContentService.ServiceGetOneById(id).subscribe(next => {
      this.dataModelResult = next;
    })
  }
  dataConetntTagGetAll(id: number): void {
    if (id === 0) {
      return;
    }
    const filteModelContent = new FilterModel();
    const filterDataModel = new FilterDataModel();
    filterDataModel.propertyName = 'LinkContentId';
    filterDataModel.value = id;
    filteModelContent.filters.push(filterDataModel);
    this.newsContentTagService.ServiceGetAll(filteModelContent).subscribe(next => {
      if (next.isSuccess && next.listItems.length > 0) {
        const concat = next.listItems.map(x => x.linkTagId).reduce((g: any, LinkTagId: number) => {
          g += name;
          return g;
        }, '');
        this.dataTagRelatGetAll(concat);
      }
    })
  }
  dataConetntCommentGetAll(id: number): void {
    if (id === 0) {
      return;
    }
    const filteModelContent = new FilterModel();
    const filterDataModel = new FilterDataModel();
    filterDataModel.propertyName = 'LinkContentId';
    filterDataModel.value = id;
    filteModelContent.filters.push(filterDataModel);
    this.newsCommentService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelCommentResult = next;
    })
  }
  dataTagRelatGetAll(ids: number[]): void {
    if (ids.length === 0) {
      return;
    }
    const filteModelContent = new FilterModel();
    const filterDataModel = new FilterDataModel();
    filterDataModel.propertyName = 'Id';
    filterDataModel.values = ids;

    filteModelContent.filters.push(filterDataModel);
    filteModelContent.sortType = EnumSortType.Random;
    this.coreModuleTagService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelTagRelatResult = next;
    })
  }
  dataTagGetAll(): void {
    const filteModelContent = new FilterModel();
    filteModelContent.sortType = EnumSortType.Random;
    this.coreModuleTagService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelTagResult = next;
    })
  }
  onFormSubmitComment(): void {
    if (this.dataModelComment.comment.length > 0) {
      this.dataConetntCommentAdd();
    }
  }
  dataConetntCommentAdd(): void {

    this.newsCommentService.ServiceAdd(this.dataModelComment).subscribe(next => {
      this.dataModelCommentResult = next;
    })
  }
}
