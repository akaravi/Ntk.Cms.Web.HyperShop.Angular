import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  CoreModuleTagModel,
  CoreModuleTagService,
  EnumSortType,
  ErrorExceptionResult,
  FilterDataModel,
  FilterModel,
  NewsContentModel,
  NewsContentService
} from 'ntk-cms-api';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.sass']
})
export class NewsListComponent implements OnInit {
  constructor(
    private newsContentService: NewsContentService,
    private coreModuleTagService: CoreModuleTagService,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(
      (params: Params) => {
        this.tag = params.tag;
        this.category = params.id;
      }
    )
  }
  category = 0;
  tag = 0;
  dataModelResult = new ErrorExceptionResult<NewsContentModel>();
  dataModelLastResult = new ErrorExceptionResult<NewsContentModel>();
  dataModelTagResult = new ErrorExceptionResult<CoreModuleTagModel>();
  ngOnInit() {
    this.dataGetAll(this.category, this.tag);
    this.dataGetAllLast();
    this.dataTagGetAll();
  }
  dataGetAll(category: number, tag: number): void {
    const filteModelContent = new FilterModel();
    if (category > 0) {
      const filterDataModel = new FilterDataModel();
      filterDataModel.propertyName = 'LinkCategoryId';
      filterDataModel.value = category;
      filteModelContent.filters.push(filterDataModel);
    }
    if (tag > 0) {
      const filterDataModel = new FilterDataModel();
      filterDataModel.propertyName = 'ContentTags';
      filterDataModel.propertyAnyName = 'LinkTagId';
      filterDataModel.value = tag;
      filteModelContent.filters.push(filterDataModel);
    }
    this.newsContentService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelResult = next;
    })
  }
  dataGetAllLast(): void {
    const filteModelContent = new FilterModel();

    this.newsContentService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelLastResult = next;
    })
  }
  dataTagGetAll(): void {
    const filteModelContent = new FilterModel();
    filteModelContent.sortType = EnumSortType.Random;
    this.coreModuleTagService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelTagResult = next;
    })
  }
}
