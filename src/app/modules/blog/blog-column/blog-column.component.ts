import { Component, OnInit } from '@angular/core';
import {
  CoreModuleTagModel,
  CoreModuleTagService,
  EnumSortType,
  ErrorExceptionResult,
  FilterDataModel,
  FilterModel,
  BlogContentModel,
  BlogContentService
} from 'ntk-cms-api';

@Component({
  selector: 'app-blog-column',
  templateUrl: './blog-column.component.html',
  styleUrls: ['./blog-column.component.sass']
})
export class BlogColumnComponent implements OnInit {


  constructor(private blogContentService: BlogContentService, private coreModuleTagService: CoreModuleTagService) { }
  dataModelResult = new ErrorExceptionResult<BlogContentModel>();
  dataModelTagResult = new ErrorExceptionResult<CoreModuleTagModel>();
  ngOnInit() {
    this.dataGetAll(null);
    this.dataTagGetAll();
  }
  dataGetAll(category: any): void {
    const filteModelContent = new FilterModel();
    if (category && category !== 'all') {
      const aaa = {
        PropertyName: 'LinkCategoryId',
        Value: +category,
      };
      filteModelContent.Filters.push(aaa as FilterDataModel);
    }
    this.blogContentService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelResult = next;
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
