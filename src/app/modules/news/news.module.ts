import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsCategoryService, NewsCommentService, NewsContentService } from 'ntk-cms-api';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NewsComponent,


  ],
  providers:[
    NewsContentService,
    NewsCategoryService,
    NewsCommentService,
  ]
})
export class NewsModule { }
