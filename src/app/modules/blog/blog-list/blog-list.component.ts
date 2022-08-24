import { Component, OnInit } from '@angular/core';
import {
  CoreModuleTagModel,
  CoreModuleTagService,
  EnumSortType,
  ErrorExceptionResult,
  FilterModel,
  BlogContentModel,
  BlogContentService,
  FilterDataModel
} from 'ntk-cms-api';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.sass']
})
export class BlogListComponent implements OnInit {
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
      filteModelContent.filters.push(aaa as any);
    }
    this.blogContentService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelResult = next;
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
