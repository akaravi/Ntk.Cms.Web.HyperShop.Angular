import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CoreModuleTagModel, CoreModuleTagService, ErrorExcptionResult, FilterModel, BlogContentModel, BlogContentService, BlogContentTagService, EnumSortType, FilterDataModel, BlogCommentService, BlogCommentModel } from 'ntk-cms-api';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.sass']
})
export class BlogDetailsComponent implements OnInit {
  dataModelResult = new ErrorExcptionResult<BlogContentModel>();
  dataModelCommentResult = new ErrorExcptionResult<BlogCommentModel>();
  dataModelTagResult = new ErrorExcptionResult<CoreModuleTagModel>();
  dataModelTagRelatResult = new ErrorExcptionResult<CoreModuleTagModel>();
  dataModelComment = new BlogCommentModel();

  constructor(private blogContentService: BlogContentService,
    private blogContentTagService: BlogContentTagService,
    private blogCommentService: BlogCommentService,
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
    this.blogContentService.ServiceGetOneById(id).subscribe(next => {
      this.dataModelResult = next;
    })
  }
  dataConetntTagGetAll(id: number): void {
    if (id === 0) {
      return;
    }
    const filteModelContent = new FilterModel();
    const filterDataModel = new FilterDataModel();
    filterDataModel.PropertyName = 'LinkContentId';
    filterDataModel.IntValue1 = id;
    filteModelContent.Filters.push(filterDataModel);
    this.blogContentTagService.ServiceGetAll(filteModelContent).subscribe(next => {
      if (next.IsSuccess && next.ListItems.length > 0) {
        let concat = next.ListItems.map(x => x.LinkTagid).reduce((g: any, LinkTagid: number) => {
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
    filterDataModel.PropertyName = 'LinkContentId';
    filterDataModel.IntValue1 = id;
    filteModelContent.Filters.push(filterDataModel);
    this.blogCommentService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelCommentResult = next;
    })
  }
  dataTagRelatGetAll(ids: number[]): void {
    if (ids.length === 0) {
      return;
    }
    const filteModelContent = new FilterModel();
    const filterDataModel = new FilterDataModel();
    filterDataModel.PropertyName = 'Id';
    filterDataModel.IntContainValues = ids;

    filteModelContent.Filters.push(filterDataModel);
    filteModelContent.SortType = EnumSortType.Random;
    this.coreModuleTagService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelTagRelatResult = next;
    })
  }
  dataTagGetAll(): void {

    const filteModelContent = new FilterModel();

    filteModelContent.SortType = EnumSortType.Random;
    this.coreModuleTagService.ServiceGetAll(filteModelContent).subscribe(next => {
      this.dataModelTagResult = next;
    })
  }
  onFormSubmitComment(): void {
    if (this.dataModelComment.Comment.length > 0) {
      this.dataConetntCommentAdd();
    }
  }
  dataConetntCommentAdd(): void {

    this.blogCommentService.ServiceAdd(this.dataModelComment).subscribe(next => {
      this.dataModelCommentResult = next;
    })
  }
}
