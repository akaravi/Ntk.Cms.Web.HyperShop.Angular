import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CoreModuleTagModel, CoreModuleTagService, EnumSortType, ErrorExceptionResult, FilterDataModel, FilterModel, NewsContentModel, NewsContentService } from 'ntk-cms-api';

@Component({
  selector: 'app-news-column',
  templateUrl: './news-column.component.html',
  styleUrls: ['./news-column.component.sass']
})
export class NewsColumnComponent implements OnInit {
  constructor(private newsContentService: NewsContentService, private coreModuleTagService: CoreModuleTagService, private route: ActivatedRoute) {

    this.route.params.subscribe(
      (params: Params) => {
        this.tag = params.tag;
        this.category = params.id;
      }
    );
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
      filterDataModel.PropertyName = 'LinkCategoryId';
      filterDataModel.Value = category;
      filteModelContent.Filters.push(filterDataModel);
    }
    if (tag > 0) {
      const filterDataModel = new FilterDataModel();
      filterDataModel.PropertyName = 'ContentTags';
      filterDataModel.PropertyAnyName = 'LinkTagId';
      filterDataModel.Value = tag;
      filteModelContent.Filters.push(filterDataModel);
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
    filteModelContent.SortType = EnumSortType.Random;
    this.coreModuleTagService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelTagResult = next;
    })
  }
}
